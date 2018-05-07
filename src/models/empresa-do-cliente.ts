import { PedidosCliente } from './pedido-cliente';
export class EmpresaDoCliente {
    chaveDaEmpresa:string;
    pedidos:PedidosCliente[];


    constructor() {
        this.pedidos = [];
    }
}
