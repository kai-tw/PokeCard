<?php
$data = json_decode(file_get_contents('https://chengkai505.github.io/Pokedex/'));
if(!isset($_GET['q'])) {
    $result = '輸入神奇寶貝的名稱或ID皆可成功查詢。';
}else{
	foreach($data as $item) {
		if(strcmp($_GET['q'], $item->Chinese) == 0 || strcasecmp($_GET['q'], $item->English) == 0 || strcmp($_GET['q'], $item->Japanese) == 0 || strcmp($_GET['q'], $item->ID) == 0) {
			$pokedex = $item;
		}
	}
	if(isset($pokedex)) {
		$html = '<div class="poke-card poke-'.strtolower($pokedex->Type[0]).'"><div class="poke-back"><img alt="'.$pokedex->Chinese.'" src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/'.sprintf("%03d", $pokedex->ID).'.png"></div><div class="poke-data"><div class="poke-icon"></div><div class="poke-type">';
		foreach ($pokedex->Type as $type) {
			$html .= '<span class="text-' . strtolower($type) . '">' . $type . '</span>';
		}
		$html .='</div><div class="poke-id">'.$pokedex->ID.'</div><div class="poke-lang">'.$pokedex->Chinese.'</div><div class="poke-lang">'.$pokedex->Japanese.'</div><div class="poke-lang">'.$pokedex->English.'</div></div></div>';
		$htmlCode = '<h2>HTML Code</h2><textarea>'.htmlspecialchars($html).'</textarea>';
		$result = '<h2>預覽</h2>'.$html;
	}else{
		$result = '沒有符合的搜尋內容，請檢查關鍵字是否正確。';
	}
}
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset='utf-8'>
	<meta content='width=device-width' name='viewport'>
	<title>神奇寶貝卡片產生器</title>
	<link href="https://fonts.googleapis.com/css2?family=Ubuntu&display=swap" rel="stylesheet">
	<style>
	::-webkit-scrollbar {
	    width: 10px;
	}
	::-webkit-scrollbar-thumb {
	    background: #666;
	    border-radius: 5px;
	}
	html {
		background: url(https://1.bp.blogspot.com/-2j0lSH8gLBc/XWSGaZmZNGI/AAAAAAAAW3Q/zx5_OLOFhhsK7Qdw9uYiVV_CN-UccJTBgCKgBGAs/s1600/alexandr-bormotin-X8MLIFfcF-g-unsplash.jpg) center/cover no-repeat;
	}
	body {
		margin: 2em auto;
		padding: 2em;
		border-radius: 2em;
		max-width: 400px;
		backdrop-filter: blur(1em);
		box-shadow: 0 0 2em rgba(0, 0, 0, .2);
		text-align: center;
		font: 16px/2 'Ubuntu', 'Microsoft JhengHei',sans-serif;
	}
	h1, h2 {
		margin: 0;
	}
	input[type=text] {
		outline: none;
		margin: .5em 0;
		border: none;
		border-bottom: 1px solid;
		background: transparent;
		width: 100%;
		text-align: center;
		font-size: 2em;
		box-sizing: border-box;
	}
	input[type=submit] {
		width: 100%;
		margin-bottom: 1em;
		padding: 1em;
		border: none;
		border-radius: 1em;
		box-sizing: border-box;
		background: rgba(255, 255, 255, .5);
	}
	textarea {
		outline: none;
		margin: 0;
		padding: 1em;
		border: none;
		border-radius: 2em;
		width: 100%;
		height: 10em;
		background: rgba(255, 255, 255, .5);
		resize: none;
		box-sizing: border-box;	
	}
	</style>
</head>
<body>
	<h1>神奇寶貝卡片產生器</h1>
	<form action='' method='get'>
		<input type='text' name='q'>
		<input type='submit' value='產生'>
	</form>
	<?php echo $result,$htmlCode?>
	<script defer src="https://chengkai505.github.io/PokeCard/load.js"></script>
</body>
</html>