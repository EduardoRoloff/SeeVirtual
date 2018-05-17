import { Usuario } from './../autenticacao-service/usuario';
import { Erros } from './erros';

export class Validacoes {



    erros: Erros[] = [];
    static validacoes: Validacoes;
    private constructor() {

    }

    public static obterInstancia() {
        if (this.validacoes == null) {
            this.validacoes = new Validacoes();
            return this.validacoes;
        } else {
            return this.validacoes;
        }

    }

    validarUsuario(usuario: Usuario) {
        if (!usuario.email)
            throw new Error("Email não foi informado!");
        if (!usuario.senha || usuario.senha.length < 6)
            throw new Error("Senha não infomada ou muito curta!");
    }
    addExcessao(tipo: string, mensagem: string) {
        this.erros.push(new Erros(tipo, mensagem));
    }

}
