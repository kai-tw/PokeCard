import "@sass/main.sass";
import {PokeCard} from "./PokeCard";

document.getElementById("poke-card-submit")?.addEventListener("click", (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const inputElement: HTMLInputElement | null = document.getElementById("poke-card-input") as HTMLInputElement;
    const id: number = parseInt(inputElement?.value);
    if (isNaN(id)) {
        return;
    }

    PokeCard.getHTML(id).then((html) => {
        const container = document.getElementById("poke-card-container") as HTMLDivElement;
        if (container) {
            container.innerHTML = html;
        }

        const code = document.getElementById("poke-card-code") as HTMLTextAreaElement;
        if (code) {
            code.value = html;
        }
    });
});