import { Empresa } from './empresa';
import { PedidosCliente } from './pedido-cliente';
import { EmpresaDoCliente } from './empresa-do-cliente';

export class Cliente {
    $key:string;
    usuario:string;
    empresa:EmpresaDoCliente[]

    constructor(usuario:string) {
        this.usuario = usuario;
        this.empresa = [];
    }
}