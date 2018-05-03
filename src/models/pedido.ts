import { ItemPedido } from "./itemPedido";

export class Pedido {

    /**
     *
     */
    constructor(emailLogado: string) {
        this.itens = [];
        this.emailDoCliente = emailLogado;
    }

    numeroDoPedido: string;
    itens: ItemPedido[];
    pedidoEmAberto: boolean;
    emailDoCliente: string;
    horaDoPedido: Date;
    mesa:string;
}
