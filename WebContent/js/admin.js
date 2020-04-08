
var rootURL = "http://localhost:8080/Pokedex/rest/pokedex";

var currentPokemon;

var search =function(searchKey) {
	$('#pokeList').remove;
	if (searchKey == '') 
		findAll();
	else
		findByName(searchKey);
};

var newBuddy=function () {
	$('#btnDelete').hide();
	$('#btnSaveNew').show();
	$('#btnSave').hide();	
	currentPokemon = {};
	renderDetails(currentPokemon); // Display empty form
};

var findAll = function() {
	console.log('findAll');
	$('#pokeList').remove
	$.ajax({
		type: 'GET',
		url: rootURL,
		dataType: "json",
		success: renderList
	});
}

var findByName= function(searchKey) {
	console.log('findByName: ' + searchKey);
	$.ajax({
		type: 'GET',
		url: rootURL + '/search/' + searchKey,
		dataType: "json",
		success: renderList 
	});
};

var findById = function(id) {
	console.log('findById: '+id);
	$.ajax({
		type: 'GET',
		url: rootURL + '/' +id,
		dataType: "json",
		success: function(data){
			    $('#btnDelete').show();
			    $('#btnSaveNew').hide();
				console.log ('findbyId success: '+ data.name);
				currentPokemon = data;
				renderDetails(currentPokemon);
		}
	});
}

var addBuddy = function () {
	console.log('addBuddy');
	$.ajax({
		type: 'POST',
		contentType: 'application/json',
		url: rootURL,
		dataType: "json",
		data: formToJSON(),
		success: function(data, textStatus, jqXHR){
			alert('Pokemon created successfully');
			$('#btnDelete').show();
			$('#btnSaveNew').hide();
			$('#pokemonId').val(data.id);
                        findAll();
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('addBuddy error: ' + textStatus);
		}
	});
};

var updateBuddy= function () {
	console.log('updateBuddy');
	$.ajax({
		type: 'PUT',
		contentType: 'application/json',
		url: rootURL + '/' + $('#Id').val(),
		dataType: "json",
		data: formToJSON(),
		success: function(data, textStatus, jqXHR){
			alert('Pokemon updated successfully');
                         findAll();
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('updateBuddy error: ' + textStatus);
		}
	});
};

var deleteBuddy=function() {
	console.log('deleteBuddy');
	$.ajax({
		type: 'DELETE',
		url: rootURL + '/' + $('#Id').val(),
		success: function(data, textStatus, jqXHR){
			alert('Pokemon deleted successfully');
                         findAll();
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('deleteBuddy error');
		}
	});
};

function renderList(data) {
	var list=data;
	$('#pokeList li').remove();
	$.each(list, function(id, pokemon) {
		$('#pokeList').append('<li><a href="#" id="' + pokemon.id + '">'+pokemon.name+'</a></li>');
	});
};
	

function renderDetails(pokemon) {
	$('#Id').val(pokemon.id);
	$('#name').val(pokemon.name);
	$('#region').val(pokemon.region);
	$('#category').val(pokemon.category);
	$('#attack').val(pokemon.evolution);
	$('#evolution').val(pokemon.evolution);
	$('#gender').val(pokemon.gender);
	$('#img').attr('src', pokemon.img);
	$('#description').val(pokemon.description);	
}

var formToJSON=function () {
	var pokemonId = $('#Id').val();
	console.log(currentPokemon.img);
	return JSON.stringify({
		"id": $('#Id').val(), 
		"name": $('#name').val(), 
		"region": $('#region').val(),
		"category": $('#category').val(),
		"attack": $('#attack').val(),
		"evolution": $('#evolution').val(),
		"gender": $('#gender').val(),
		"img": currentPokemon.img,
		"description": $('#description').val()
		});
};


//When the DOM is ready.
$(document).ready(function(){
	$('#btnDelete').hide();
	$('#btnSave').hide();
	$('#btnSaveNew').show();
	
	// Register listeners
	$('#btnSearch').click(function() {
		search($('#searchKey').val());
		return false;
	});

	// Trigger search when pressing 'Return' on search key input field
	$('#searchKey').keypress(function(e){
		if(e.which == 13) {
			search($('#searchKey').val());
			e.preventDefault();
			return false;
	    }
	});

	$('#btnAdd').click(function() {
		$('#btnSaveNew').show();
		$('#btnSave').hide();
		newBuddy();
		return false;
	});

	$('#btnSaveNew').click(function() {
			addBuddy();
		return false;
	});
	
	$('#btnSave').click(function() {
		 updateBuddy();
		return false;
	});

	$('#btnDelete').click(function() {
		deleteBuddy();
		return false;
	});
	
	$(document).on("click", "#pokeList a", function() {findById(this.id);});
	
	// Replace broken images with generic 
	$("img").error(function(){
	  $(this).attr("src", "img/generic.jpg");	

	});
	//reset form
	$('#pokemonId').val("");
	$('#name').val("");
	$('#region').val("");
	$('#attack').val("");
	$('#category').val("");
	$('#evolution').val("");
	$('#gender').val("");
	$('#img').attr('src', "");
	$('#description').val("");
	findAll();
});


