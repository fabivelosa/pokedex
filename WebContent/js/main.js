
var rootURL = "http://localhost:8080/Pokedex/rest/pokedex";

//jQuery object is $
$(document).ready(function() {
	findAll();
});
//When DOM is loaded


//[{..}, {...},...] array of objects
function renderList(data) {
	list = data.pokedex;
	$('#pokeList').remove
	$.each(data, function(id, pokemon) {
		$('#pokeList').append(
				'<li><a href="#" id="' + pokemon.id + '">' + pokemon.name + '</a></li>');
	
	});
}

var findAll = function() {
	console.log('findAll');
	// ajax request or HTTPRequest - sent asynchrounous
	// jQuery method ajax
	// when HTTPResponse with status code 200 or 304 call function renderList
	$.ajax({
		type: 'GET',
		url: rootURL,
		dataType: "json",
		success: renderList
	});
}

$(document).on("click", "#pokeList a", function() {
	findById(this.id);
});


var currentPokemon;

var findById = function(id) {
	console.log('findById: '+id);
	$.ajax({
		type: 'GET',
		url: rootURL + '/' +id,
		dataType: "json",
		success: function(data){
			    $('#btnDelete').show();
				console.log ('findbyId success: '+ data.name);
				currentPokemon = data;
				renderDetails(currentPokemon);
		}
	});
}

function renderDetails(pokemon) {
	$('#Id').val(pokemon.id);
	$('#name').val(pokemon.name);
	$('#region').val(pokemon.region);
	$('#category').val(pokemon.category);
	$('#evolution').val(pokemon.evolution);
	$('#gender').val(pokemon.gender);
	$('#img').attr('src','img/'+ pokemon.photo);
	$('#description').val(pokemon.description);
	
}
