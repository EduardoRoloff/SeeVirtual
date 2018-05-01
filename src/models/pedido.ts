import { ItemPedido } from "./itemPedido";

export class Pedido {

    /**
     *
     */
    constructor() {
        this.itens = [];
        
    }

    numeroDoPedido: string;
    itens: ItemPedido[];
    pedidoEmAberto: boolean;
    emailDoCliente: string;
    horaDoPedido: Date;
    mesa:string;
}
