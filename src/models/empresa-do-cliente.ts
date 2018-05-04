import { PedidosCliente } from './pedido-cliente';
export class EmpresaDoCliente {
    chaveDaEmpresa:string;
    pedido:PedidosCliente[];


    constructor() {
        this.pedido = [];
    }
}
