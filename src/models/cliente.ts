import { EmpresaDoCliente } from './empresa-do-cliente';

export class Cliente {
    $key:string;
    usuario:string;
    empresas:EmpresaDoCliente[]

    constructor(usuario:string) {
        this.usuario = usuario;
        this.empresas = [];
    }
}