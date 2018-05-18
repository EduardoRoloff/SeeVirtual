import { PedidosCliente } from './../../models/pedido-cliente';
import { Pedido } from './../../models/pedido';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Empresa } from '../../models/empresa';
import { v1 } from 'uuid';
import { AutenticacaoServiceProvider } from '../autenticacao-service/autenticacao-service';
import { ItemPedido } from '../../models/itemPedido';
import { Adicionais } from '../../models/adicionais';


@Injectable()
export class ServicosProvider {

  private EMPRESAS = 'empresas';
  private CLIENTES = 'clientes';
  clientesList: AngularFireList<any>;
  empresasList: AngularFireList<any[]>;
  mesaSelecionada: string;

  pedidoEmAndamento: Pedido;
  empresaSelecionda: Empresa;
  listaDaComanda: ItemPedido[];

  empresaFoiSelecionada: boolean;
  itens: ItemPedido[] = [];

  constructor(private db: AngularFireDatabase,
    private servicoLogin: AutenticacaoServiceProvider) {

    this.getList()

  }
  recarregarPedido() {
    if (this.empresaFoiSelecionada)
      this.buscarEmpresaSelecionada(this.empresaSelecionda)
  }
  
  obterPedidoDoUsuario(chaveDopedido: string) {

    let ref = this.db.database.ref('empresas/' + this.empresaSelecionda.$key + '/pedidos');
    ref.orderByKey().equalTo(chaveDopedido).on('child_added', snepshot => {
      let pedido = snepshot.val() as Pedido;
      this.pedidoEmAndamento = pedido;
      this.preecherListaDaComanda();
      return;
    });

  }

  preecherListaDaComanda() {
    let listaAtendidos = this.pedidoEmAndamento.itens.filter(c => c.antendido);
    //this.agruparListaDoPedido(listaAtendidos);
    this.listaDaComanda = listaAtendidos;
  }

  agruparListaDoPedido(listaPedidos: ItemPedido[]) {

    listaPedidos.forEach(c => {
      let nome = c.item.nome;
      if (!this.itens[nome]) {
        this.itens[nome] = [];
      }
      this.itens[nome].push(c);
      if (c.antendido) {
        this.listaDaComanda = listaPedidos;
      }
    })


  }

  buscarEmpresaSelecionada(empresa: Empresa) {
    let list = Array<Empresa>();
    list = [];

    this.db.database
      .ref(this.EMPRESAS)
      .orderByKey()
      .equalTo(empresa.$key).on("child_added", (snapshot) => {
        let item = snapshot.val();
        item.$key = snapshot.key;
        list.push(item as Empresa)
        this.empresaSelecionda = list[0];
        this.verificarPedidoEmAberto();
        this.empresaFoiSelecionada = true;
      });
  }

  salvarCliente(email: string) {
    this.clientesList.push({
      usuario: email
    });
  }

  verificarPedidoEmAberto() {

    if (!this.servicoLogin.clienteLogado.pedidos) {
      this.pedidoEmAndamento = new Pedido(this.servicoLogin.clienteLogado.usuario);
      return;
    }

    let pedidosDoCliente = Object.values(this.servicoLogin.clienteLogado.pedidos);
    let pedido: PedidosCliente;

    if (pedidosDoCliente) {
      pedido = pedidosDoCliente.find(c => c.status && c.empresa == this.empresaSelecionda.$key);
    }

    if (!pedido) {
      this.pedidoEmAndamento = new Pedido(this.servicoLogin.clienteLogado.usuario);
      return
    }

    this.obterPedidoDoUsuario(pedido.numero);
  }


  getList() {
    this.empresasList = this.db.list(this.EMPRESAS);
    return this.empresasList;
  }

  obterListaDeClientes() {
    this.clientesList = this.db.list(this.CLIENTES);

  }

  selecionarMesa(mesa: string) {
    this.mesaSelecionada = mesa;
  }

  inserirPedido() {

    if (!this.pedidoEmAndamento) {
      return;
    }
    if (!this.pedidoEmAndamento.pedidoEmAberto) {
      this.pedidoEmAndamento.pedidoEmAberto = true;
    }

    if (!this.pedidoEmAndamento.numeroDoPedido) {
      this.pedidoEmAndamento.numeroDoPedido = v1();
    }

    this.pedidoEmAndamento.horaDoPedido = new Date();

    let path = this.EMPRESAS + '/' + this.empresaSelecionda.$key + '/pedidos/' + this.pedidoEmAndamento.numeroDoPedido;
    this.db.object(path).set({ ...this.pedidoEmAndamento });

    this.salvarPedidoNoCliente();
    this.servicoLogin.obterUsuarioLogado(this.servicoLogin.clienteLogado.usuario);

  }

  private salvarPedidoNoCliente() {
    let pedidoDoCliente = new PedidosCliente();

    pedidoDoCliente.status = true;
    pedidoDoCliente.numero = this.pedidoEmAndamento.numeroDoPedido;
    pedidoDoCliente.dataPedido = this.pedidoEmAndamento.horaDoPedido;
    pedidoDoCliente.empresa = this.empresaSelecionda.$key;

    let path = this.CLIENTES + '/' + this.servicoLogin.clienteLogado.$key + '/' + '/pedidos/' + pedidoDoCliente.numero;
    this.db.object(path).set({ ...pedidoDoCliente });
  }

  somarConta() {
    this.somarItens();
    this.somarValoresAdicionais();
  }

  fecharConta() {
    if (this.pedidoEmAndamento.pedidoEmAberto) {
      throw new Error("Ainda existem pedidos em aberto!");
    }
     
    this.pedidoEmAndamento.solicitacaoDeFechamento.pago= false;
    this.pedidoEmAndamento.solicitacaoDeFechamento.solicitado= true;
    let path = this.EMPRESAS + '/' + this.empresaSelecionda.$key + '/pedidos/' + this.pedidoEmAndamento.numeroDoPedido + '/solicitacaoDeFechamento/';
    this.db.object(path).set({ ...this.pedidoEmAndamento.solicitacaoDeFechamento });
  }

  somarItens(): any {
    let total = 0;
    this.pedidoEmAndamento.itens.forEach(item => {
      let valor = parseFloat(item.item.preco+'') * parseFloat(item.quantidade+'');
      total = total + valor;
    })
    this.pedidoEmAndamento.solicitacaoDeFechamento.valorTotal = parseFloat(total+'');
  }

  somarValoresAdicionais(): any {

    if(!this.empresaSelecionda.valoresAdicionais){
      return;
    }
    let adicionais = 0

    let adicionaisAtivos = this.empresaSelecionda.valoresAdicionais.filter(c => c.ativo);


    let valores = adicionaisAtivos.filter(c => !c.percentual);

    valores.forEach(x => {
      adicionais = parseFloat(adicionais+'')  + parseFloat(x.valor+'');
    });

    let percentuais = adicionaisAtivos.filter(c => c.percentual);

    var total = this.pedidoEmAndamento.solicitacaoDeFechamento.valorTotal + adicionais;

    percentuais.forEach(c => {

      let val = parseFloat(total+'') * parseFloat(c.valor+'') / 100;
      adicionais = parseFloat(adicionais+'') + parseFloat(val+'');
    })

   

    this.empresaSelecionda.valoresAdicionais.forEach(add => {

      var adicional = new Adicionais();
      adicional.descricao = add.descricao;
      adicional.valor = add.valor;
      if(!this.pedidoEmAndamento.solicitacaoDeFechamento.adicionais){
        this.pedidoEmAndamento.solicitacaoDeFechamento.adicionais = [];
      }
      this.pedidoEmAndamento.solicitacaoDeFechamento.adicionais.push(adicional);
    })

    this.pedidoEmAndamento.solicitacaoDeFechamento.valorTotalAdicionais = adicionais;


    this.pedidoEmAndamento.solicitacaoDeFechamento.valorTotal = parseFloat(this.pedidoEmAndamento.solicitacaoDeFechamento.valorTotal + adicionais+'') ;

    if(this.pedidoEmAndamento.solicitacaoDeFechamento.pagarDezPorcento){

      let val = parseFloat(this.pedidoEmAndamento.solicitacaoDeFechamento.valorTotal+'') * parseFloat(10+'') / 100;
      this.pedidoEmAndamento.solicitacaoDeFechamento.valorTotal = parseFloat(this.pedidoEmAndamento.solicitacaoDeFechamento.valorTotal + val+'') ;
    }

  }

}
