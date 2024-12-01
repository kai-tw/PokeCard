<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

if (isset($attributes['pokeId'])) {
	$data = PokeApi::getPokeData($attributes['pokeId']);
}

?>
<div class="<?php echo get_block_wrapper_attributes(); ?>">
	<?php if ($data === NULL): ?>
		沒有符合的搜尋內容，請檢查關鍵字是否正確。
	<?php else: ?>
		<div class="poke-card poke-<?php echo strtolower($data->type[0]); ?>">
			<div class="poke-back">
				<img
					alt="<?php echo htmlspecialchars($data->chinese, ENT_QUOTES, 'UTF-8'); ?>"
					src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/<?php echo str_pad($data->id, 3, '0', STR_PAD_LEFT); ?>.png"
				/>
			</div>
			<div class="poke-data">
				<div class="poke-icon"></div>
				<div class="poke-type">
					<?php foreach ($data->type as $type): ?>
						<span class="text-<?php echo strtolower($type); ?>"><?php echo htmlspecialchars($type, ENT_QUOTES, 'UTF-8'); ?></span>
					<?php endforeach; ?>
				</div>
				<div class="poke-id"><?php echo $data->id; ?></div>
				<div class="poke-lang"><?php echo htmlspecialchars($data->chinese, ENT_QUOTES, 'UTF-8'); ?></div>
				<div class="poke-lang"><?php echo htmlspecialchars($data->japanese, ENT_QUOTES, 'UTF-8'); ?></div>
				<div class="poke-lang"><?php echo htmlspecialchars($data->english, ENT_QUOTES, 'UTF-8'); ?></div>
			</div>
		</div>
	<?php endif; ?>
</div>


