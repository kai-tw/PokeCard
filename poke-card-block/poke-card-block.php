<?php
/**
 * Plugin Name:       Poke Card
 * Description:       Display a single Pokemon.
 * Requires at least: 6.6
 * Requires PHP:      7.2
 * Version:           0.1.0
 * Author:            Kai
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       poke-card-block
 *
 * @package PokeCard
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

class PokeApi {
    public static function getPokeData(int $id): ?PokeData {
        try {
            // Fetch Pokémon data
            $pokemonResponse = self::fetchData("https://pokeapi.co/api/v2/pokemon/{$id}/");
            if (!$pokemonResponse) {
                return null;
            }

            // Fetch species data
            $speciesUrl = $pokemonResponse['species']['url'];
            $speciesResponse = self::fetchData($speciesUrl);
            if (!$speciesResponse) {
                return null;
            }

            $nameList = $speciesResponse['names'];

            // Create PokeData object
            $pokeData = new PokeData();
            $pokeData->id = $id;
            $pokeData->type = array_map(function ($typeObj) {
                $name = ucfirst($typeObj['type']['name']); // Capitalize first letter
                return $name;
            }, $pokemonResponse['types']);

            $pokeData->chinese = self::findName($nameList, "zh-Hant");
            $pokeData->japanese = self::findName($nameList, "ja");
            $pokeData->english = self::findName($nameList, "en");

            return $pokeData;

        } catch (Exception $e) {
            return null;
        }
    }

    private static function fetchData(string $url): ?array {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_FAILONERROR, true);
        $response = curl_exec($ch);
        curl_close($ch);

        if ($response === false) {
            return null;
        }

        return json_decode($response, true);
    }

    private static function findName(array $nameList, string $language): ?string {
        foreach ($nameList as $nameObj) {
            if ($nameObj['language']['name'] === $language) {
                return $nameObj['name'];
            }
        }
        return null;
    }
}

class PokeData {
    public int $id;
    public array $type = [];
    public string $chinese = '';
    public string $japanese = '';
    public string $english = '';
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_poke_card_block_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'create_block_poke_card_block_block_init' );
