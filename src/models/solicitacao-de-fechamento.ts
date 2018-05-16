import { Adicionais } from "./adicionais";

export class SolicitacaoDeFechamento {

    constructor() {
        this.adicionais = [];
        this.pago = false;
        this.solicitado = false;
    }

    formaDePagamento: string;
    pagarDezPorcento: boolean;
    valorTotal: number;
    valorTotalAdicionais: number;
    adicionais: Adicionais[];
    pago: boolean;
    solicitado:boolean;
}
