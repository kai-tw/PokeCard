/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import { PokeApi } from "../../src/PokeApi";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const { pokeId } = attributes;
	const [data, setData] = useState(null);

	useEffect(() => {
		if (!!pokeId) {
			PokeApi.getPokeData(pokeId).then((data) => {
				setData(data);
			});
		}
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __('Settings', 'poke-card-block') }>
					<TextControl
						label={ __('Pokemon ID', 'poke-card-block') }
						value={ pokeId || '' }
						onChange={ ( value ) => setAttributes( { pokeId: parseInt(value, 10) } ) }
					/>
				</PanelBody>
			</InspectorControls>
			<div {...useBlockProps()}>
				{ !pokeId ? "Pokemon ID is required." : !data ? "Pokemon not found." :
					<div {...{"className": "poke-card poke-" + data.type[0].toLowerCase()}}>
						<div className="poke-back">
							<img {...{"alt": data.chinese, "src": "https://assets.pokemon.com/assets/cms2/img/pokedex/full/" + data.id.toString().padStart(3, '0') + ".png"}}/>
						</div>
						<div className="poke-data">
							<div className="poke-icon"></div>
							<div className="poke-type">
								{data.type.map((type) => {
									return <span className={"text-" + type.toLowerCase()} key={type}>{type}</span>
								})}
							</div>
							<div className="poke-id">{data.id}</div>
							<div className="poke-lang">{data.chinese}</div>
							<div className="poke-lang">{data.japanese}</div>
							<div className="poke-lang">{data.english}</div>
						</div>
					</div>
				}
			</div>

		</>
	);
}
