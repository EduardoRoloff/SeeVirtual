import { Login } from "../../models/login.model";


export class Empresa{
    $key : string;
    cnpj:string;
    razaoSocial:string;
    nomeDoResponsavel:string;
    cpfDoResponsavel:string;
    cep:string;
    rua:string;
    bairro:string;
    complemento:string;
    cidade:string;
    estado:string;
    telefones: string[]
    login:Login;

}