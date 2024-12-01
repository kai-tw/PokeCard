var pokeCard = {};

pokeCard.sender = new XMLHttpRequest();
pokeCard.sender.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
	pokeCard.rawData = JSON.parse(this.responseText);
	pokeCard.main();
  }
};
pokeCard.sender.open("GET", "https://kai-tw.github.io/Pokedex/", true);
pokeCard.sender.send();

pokeCard.main = function () {
	pokeCard.nodes = document.getElementsByClassName("poke-card");
	for (let i = 0; i < pokeCard.nodes.length; i++) {
		if (!pokeCard.nodes[i].dataset.id)continue;
		let data = pokeCard.rawData[pokeCard.nodes[i].dataset.id - 1];
		pokeCard.nodes[i].classList.add("poke-" + data["Type"][0].toLowerCase());
		let code = '<div class="poke-back"><img alt="' + data["Chinese"] + '" src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/' + data["ID"].toString().padStart(3, '0') + '.png"></div><div class="poke-data"><div class="poke-icon"></div><div class="poke-type">';
		data["Type"].forEach(function(t){
			code += '<span class="text-' + t.toLowerCase() + '">' + t + '</span>';
		});
		code += '</div><div class="poke-id">' + data["ID"] + '</div><div class="poke-lang">' + data["Chinese"] + '</div><div class="poke-lang">' + data["Japanese"] + '</div><div class="poke-lang">' + data["English"] + '</div></div>';
		pokeCard.nodes[i].innerHTML = code;
	}
}
