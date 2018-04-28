import { Pedido } from './pedido';

export class Mesa {
    
    numero: string;
    pedidos: Pedido[];
    emAberto: boolean;

    constructor() {
        this.pedidos = new Array<Pedido>();
    }
}