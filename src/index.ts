import "@sass/main.sass";
import "@sass/poke-card.sass";
import {PokeApi} from "./PokeApi";

document.getElementById("poke-card-submit")?.addEventListener("click", (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const inputElement: HTMLInputElement | null = document.getElementById("poke-card-input") as HTMLInputElement;
    const id: number = parseInt(inputElement?.value);
    if (isNaN(id)) {
        return;
    }

    PokeApi.getPokeData(id).then((pokeData) => {
        let node = document.createElement("div");

        if (pokeData !== null) {
            node.classList.add("poke-card");

            const className = pokeData.type?.[0].toLowerCase();
            node.classList.add('poke-' + className);

            // Create the background container.
            const pokeBackNode = document.createElement('div');
            pokeBackNode.classList.add('poke-back');
            node.appendChild(pokeBackNode);

            // Create the background image.
            const idString = pokeData.id.toString().padStart(3, '0');
            const imageNode = document.createElement('img');
            imageNode.alt = pokeData.chinese;
            imageNode.src = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${idString}.png`;
            pokeBackNode.appendChild(imageNode);

            // Create the data container.
            const pokeDataNode = document.createElement('div');
            pokeDataNode.classList.add('poke-data');
            node.appendChild(pokeDataNode);

            // Create the icon container.
            const pokeIconNode = document.createElement('div');
            pokeIconNode.classList.add('poke-icon');
            pokeDataNode.appendChild(pokeIconNode);

            // Create the type container.
            const pokeTypeNode = document.createElement('div');
            pokeTypeNode.classList.add('poke-type');
            pokeDataNode.appendChild(pokeTypeNode);

            // Create the type text.
            pokeData.type?.forEach((type) => {
                const typeNode = document.createElement('span');
                typeNode.classList.add('text-' + type.toLowerCase());
                typeNode.innerText = type;
                pokeTypeNode.appendChild(typeNode);
            });

            // Create the ID.
            const pokeIdNode = document.createElement('div');
            pokeIdNode.classList.add('poke-id');
            pokeDataNode.appendChild(pokeIdNode);
            pokeIdNode.innerText = pokeData.id.toString();

            // Create the Chinese name.
            const chineseNameNode = document.createElement('div');
            chineseNameNode.classList.add('poke-lang');
            chineseNameNode.innerText = pokeData.chinese;
            pokeDataNode.appendChild(chineseNameNode);

            // Create the Japanese name.
            const japaneseNameNode = document.createElement('div');
            japaneseNameNode.classList.add('poke-lang');
            japaneseNameNode.innerText = pokeData.japanese;
            pokeDataNode.appendChild(japaneseNameNode);

            // Create the English name.
            const englishNameNode = document.createElement('div');
            englishNameNode.classList.add('poke-lang');
            englishNameNode.innerText = pokeData.english;
            pokeDataNode.appendChild(englishNameNode);
        } else {
            node.innerText = "沒有符合的搜尋內容，請檢查關鍵字是否正確。";
        }

        const container = document.getElementById("poke-card-container") as HTMLDivElement;
        if (container) {
            container.innerHTML = node.outerHTML;
        }

        const code = document.getElementById("poke-card-code") as HTMLTextAreaElement;
        if (code) {
            code.value = node.outerHTML;
        }
    });
});