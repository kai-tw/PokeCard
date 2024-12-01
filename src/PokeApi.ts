import axios from "axios";
import { PokeData } from "./data/PokeData";

export class PokeApi {
    static async getPokeData(id: number): Promise<PokeData | null> {
        try {
            const pokemonResponse = await axios(`https://pokeapi.co/api/v2/pokemon/${id}/`);
            const response = await axios(pokemonResponse.data.species.url);
            const nameList = response.data.names;

            let pokeData = new PokeData();
            pokeData.id = id;
            pokeData.type = pokemonResponse.data.types.map((typeObj: any) => {
                const name: string = typeObj.type.name;
                return name.charAt(0).toUpperCase() + name.slice(1);
            });
            pokeData.chinese = nameList.find((nameObj: any) => nameObj.language.name === "zh-Hant").name;
            pokeData.japanese = nameList.find((nameObj: any) => nameObj.language.name === "ja").name;
            pokeData.english = nameList.find((nameObj: any) => nameObj.language.name === "en").name;
            return pokeData;
        } catch (e) {
            return null;
        }
    }
}
