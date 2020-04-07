
var rootURL = "http://localhost:8080/Pokedex/rest/pokedex";

var currentPokemon;
var newpoke;

var dataJson;

$(function() {
	$("#tabs").tabs({
		activate : function(event, ui) {
			console.log(ui.newTab.index());
			
			if(dataJson == null){
				ui.newPanel.load(self.findAll(ui.newTab.index()));
			}else{
				if(ui.newTab.index()==1){
					populateGrid(dataJson);
				}else{
					populateDataTable(dataJson);
				}
			}
		}

	});

});

function findAll(id) {
	$.ajax({
		type : 'GET',
		url : rootURL,
		dataType : "json",
		success : function(data) {
			dataJson = data;
			if (id == 2) {
				populateDataTable(data);
				
			} else {
				populateGrid(data);
			}

		}
	});

}

function populateGrid(data) {

	$(data).each(function(i, pokemon) {

		append(pokemon);
	});
}

function append(pokemon) {

	var pt = $('#pokemon-item').clone();
	pt.find('.pokemon-name').text(pokemon.name);
	pt.find('.pokemon-description').text(pokemon.description);
	pt.find('.pokemon-category').text(pokemon.category);
	pt.find('.pokemon-attack').text(pokemon.attack);
	pt.attr('id', 'pokemon-id-' + pokemon.id)
	pt.find('.pokemon-image').attr('src', pokemon.img);
	pt.show();

	$('#pokemon-row').append(pt);
}

function populateDataTable(data) {

	$('#table_id-1')
			.DataTable(
					{
						"paging" : true,
						"searching" : true,
						"retrieve" : true,
						"processing" : true,
						"data" : data,
						"columns" : [ {
							"data" : "name"
						}, {
							"data" : "gender"
						}, {
							"data" : "evolution"
						}, {
							"data" : "attack"
						}, ],
						"columnDefs" : [
								{//name
									visible : true,
									targets : 0,
									className : 'dt-center',
									render : function(data, type, full,
											meta) {
										return data;
									}
								},
								{//gender
									visible : true,
									targets : 1,
									className : 'dt-center',
									render : function(data, type, full,
											meta) {
										return data;
									}
								},
								{//evolution
									visible : true,
									targets : 2,
									className : 'dt-center',
									render : function(data, type, full,
											meta) {
										return data;
									}
								},
								{//attack
									visible : true,
									targets : 3,
									className : 'dt-center',
									render : function(data, type, full,
											meta) {
										return data;
									}
								},
								{//action
									visible : true,
									targets : 4,
									className : "dt-center",
									render : function(data, type, full,
											meta) {

										return '<button id="editBtn" class="btn btn-info btn-flat edit" name="editBtn" type="button">Edit</button>'
												+ '&nbsp;&nbsp;<button id="deleteBtn" class="btn btn-info btn-flat delete" name="deleteBtn" type="button" >Delete</button>';

									}
								} ],

					});
}
	
var search =function(searchKey) {
	$('#pokeList').remove;
	if (searchKey == '') 
		
		findAll();
	else
		findByName(searchKey);
};

var newBuddy=function () {
	$('#btnDelete').hide();
	currentPokemon = {};
	renderDetails(currentPokemon); // Display empty form
};

var findAll = function() {
	console.log('findAll');
	$('#pokeList').remove
	newpoke = 0;
	$.ajax({
		type: 'GET',
		url: rootURL,
		dataType: "json",
		success: renderList
	});
}

var findByName= function(searchKey) {
	console.log('findByName: ' + searchKey);
	newpoke = 0;
	$.ajax({
		type: 'GET',
		url: rootURL + '/search/' + searchKey,
		dataType: "json",
		success: renderList 
	});
};

var findById = function(id) {
	console.log('findById: '+id);
	newpoke = 0;
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

var addBuddy = function () {
	console.log('addBuddy');
	console.log(newpoke);
	$.ajax({
		type: 'POST',
		contentType: 'application/json',
		url: rootURL,
		dataType: "json",
		data: formToJSON(),
		success: function(data, textStatus, jqXHR){
			alert('Pokemon created successfully');
			$('#btnDelete').show();
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


//[{..}, {...},...] array of objects
function renderList(data) {
	list = data.pokedex;
	$('#pokeList').empty();
	$.each(data, function(id, pokemon) {
		$('#pokeList').append(
				'<li><a href="#" id="' + pokemon.id + '">' + pokemon.name + '</a></li>');
	
	});
}

function renderDetails(pokemon) {
	$('#Id').val(pokemon.id);
	$('#name').val(pokemon.name);
	$('#region').val(pokemon.region);
	$('#category').val(pokemon.category);
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
		"evolution": $('#evolution').val(),
		"gender": $('#gender').val(),
		"img": currentPokemon.img,
		"description": $('#description').val()
		});
};


//When the DOM is ready.
$(document).ready(function(){
	// Nothing to delete in initial application state
	$('#btnDelete').hide();

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
	    newpoke =1;
		newBuddy();
		return false;
	});

	$('#btnSave').click(function() {
		if (newpoke == 1)
			addBuddy();
		else
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
	$('#category').val("");
	$('#evolution').val("");
	$('#gender').val("");
	$('#img').attr('src', "");
	$('#description').val("");
	findAll();
});


