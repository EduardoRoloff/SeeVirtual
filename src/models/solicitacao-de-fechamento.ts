import { Adicionais } from "./adicionais";

export class SolicitacaoDeFechamento {

    //PEDIDO NÃO PODE ESTAR EM ABERTO
    formaDePagamento: string;
    pagarDezPorcento: boolean;
    valorTotal: number;
    valorTotalAdicionais: number;
    adicionais: Adicionais[];
    pago: boolean;
}
