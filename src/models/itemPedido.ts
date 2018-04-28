import { Item } from "./item";

export class ItemPedido {

    item: Item;
    antendido: boolean;
    quantidade: number;
    observacao: string;
    escolhido: boolean = false;

    constructor() {
        this.antendido = false;
    }
}
