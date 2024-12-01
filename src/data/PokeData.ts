export class PokeData {
    id: number;
    type: string[];
    chinese: string;
    japanese: string;
    english: string;

    constructor() {
        this.id = 0;
        this.type = [];
        this.chinese = "";
        this.japanese = "";
        this.english = "";
    }
}