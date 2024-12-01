(function(){
	let pokeCard = document.getElementsByClassName("poke-card");
	if (pokeCard.length > 0 || document.getElementsByClassName("pokemon-container").length > 0) {
		let link = document.createElement("link");
		link.rel = "stylesheet";
		link.href = "//kai-tw.github.io/PokeCard/style.css";
		document.head.appendChild(link);
	}
	if (location.hostname != "kai73002981.blogspot.com") {
		let link = document.createElement("link");
		link.rel = "stylesheet";
		link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css";
		document.head.appendChild(link);
		for (let i = 0; i < pokeCard.length; i++) {
			pokeCard[i].children[1].innerHTML += '<a class="poke-github" href="https://github.com/kai-tw/PokeCard"><i class="fab fa-github"></i></a>';
		}
	}
})();
