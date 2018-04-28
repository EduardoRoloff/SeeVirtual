import { ItemPedido } from "./itemPedido";

export class Pedido {

    numeroDoPedido: string;
    itens: ItemPedido[];
    pedidoEmAberto: boolean;
    emailDoCliente: string;
    horaDoPedido: Date;
}
