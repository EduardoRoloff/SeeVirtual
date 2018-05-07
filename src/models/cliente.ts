import { PedidosCliente } from './pedido-cliente';

export class Cliente {
    $key:string;
    usuario:string;
    pedidos: PedidosCliente[]

    constructor(usuario:string) {
        this.usuario = usuario;
        this.pedidos = [];
    }
}