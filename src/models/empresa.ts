import { Login } from "./login";
import { Item } from "./item";
import { Pedido } from './pedido';
import { AdditionalValues } from "./additional-values";

export class Empresa {

    $key: string;
    cnpj: string;
    razaoSocial: string;
    nomeDoResponsavel: string;
    cpfDoResponsavel: string;
    cep: string;
    rua: string;
    bairro: string;
    complemento: string;
    cidade: string;
    estado: string;
    telefones: string[]
    login: Login;
    logo: string;
    itens: Item[];
    quantidadeDeMesas: number;
    pedidos:Pedido[];
    valoresAdicionais:AdditionalValues[]

    constructor() {
        this.telefones = new Array;
        this.itens = new Array<Item>();
        this.login = new Login();
    }
}
