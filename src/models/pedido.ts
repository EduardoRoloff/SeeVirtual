import { ItemPedido } from "./itemPedido";
import { SolicitacaoDeFechamento } from "./solicitacao-de-fechamento";

export class Pedido {

    constructor(emailLogado: string) {
        this.itens = [];
        this.emailDoCliente = emailLogado;
        this.solicitacaoDeFechamento =  new SolicitacaoDeFechamento();
    }

    numeroDoPedido: string;
    itens: ItemPedido[];
    pedidoEmAberto: boolean;
    emailDoCliente: string;
    horaDoPedido: Date;
    mesa:string;
    solicitacaoDeFechamento: SolicitacaoDeFechamento;
}
