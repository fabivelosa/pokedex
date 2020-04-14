/**
 * A00267345 - Fabiane Velosa *
 */

var rootURL = "http://localhost:8080/Pokedex/rest/pokedex";
var dataJson;

var user = "";
var ADMIN ="admin";
var CUSTOMER = "customer";
var pt = $('#pokemon-item');
var loginVar =0;


$(function() {
	initLogin();
	initTabs();
	pt = $('#pokemon-item'); 
	
	
});

function initLogin() {
	
	function logout() {
		clearUsernameAndPasswordField();
		loginVar = 0;
		localStorage.setItem('loginVar', 0);
		window.location.reload(true);// force reload from server instead of cache
		return false; 
	}
	
	function login() {
		var usernameToCheck = $('#username').val();
		var passwordToCheck = $('#password').val();
		if (!usernameToCheck || !passwordToCheck) {
			$('#loginError').show();
		} else {
			user = findByUsername(usernameToCheck);
			if (user != null) {
				console.log('user' + user);
				var correctPassword = user.password;

				if (passwordToCheck == correctPassword) {
					userTypeLogin(user.role);
				} else {
					$('#password').val('');
					$('#loginError').show();
					$('#btnLogout').hide();
					$('#btnLogoutCust').hide();
				}
			} else {
				console.log("user error");
				clearUsernameAndPasswordField();
				$('#loginError').show();
				$('#btnLogout').hide();
				$('#btnLogoutCust').hide();
			}
		}
		return false;
	}
	
	var findByUsername = function(username) {
		var userData;
		console.log('findByUsername: ' + username);
		$.ajax({
			type : 'GET',
			url : rootURL + '/login/search/' + username + '/',

			dataType : "json",
			async : false,
			success : function(data) {
				if(loginVar == 1){
					$('#btnLogout').show();
				}else{
					$('#btnLogoutCust').show();
				}
				userData = data
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				console.log("User doesnt exist!")
			}
		});
		return userData;
	};

	function clearUsernameAndPasswordField() {
		$('#username').val('');
		$('#password').val('');
	}
	
	function userTypeLogin(userRole) {
		console.log("userTypeLogin " + userRole)
		
		if (userRole == "ADMIN") {
			console.log("admin")
			user = "ADMIN"
			loginVar = 1;	
			//window.location.reload();// the same as the reload button on
			//window.location.href=$('#tabs-2');
			$("#tabs").tabs( { active: 2 } );
					
		} else {
			console.log("customer")
			user = "CUSTOMER";
			loginVar = 2;
			$("#tabs").tabs( { active: 1 } );
		}
	}
	
	$('#btnGo').click(function() {
		login();
		return false;
	});

	$('#btnLogout').click(function() {
		logout();
		$('#btnLogout').hide();
		return false; // this cancels the default action of the browser
	});
	
	$('#btnLogoutCust').click(function() {
		logout();
		$('#btnLogoutCust').hide();
		return false; // this cancels the default action of the browser
	});

}

function initTabs(){

	$("#tabs").tabs({
		beforeActivate : function(event, ui) {
			
				if (ui.newTab.index() == 1) {
					
					if(loginVar == 0){ 
						  alert(' Not Logged');  
						  return false;
					}
					
					if(loginVar == 1){ 
						  alert(' Access Denied');  
						  return false;
					}
					         
				} else if (ui.newTab.index() == 2) {
					
					if(loginVar == 0){ 
						  alert(' Not Logged');  
						  return false;
					}
					
					if(loginVar == 2){ 
						  alert(' Access Denied'); 
						  return false;
					}
				}else{
					if(loginVar > 0 ){
						  alert(' Already Logged');  
						  return false;
					}
				}
				
		}
	});
	
	
	
	$("#tabs").tabs({
		activate : function(event, ui) {
			console.log('tab: '+ ui.newTab.index());
				if (ui.newTab.index() == 1) {
					if ($('.row .col-lg-3').length <= 1) {
				   		 findAll(0);
				 		 initDataGrid();
					} 
				            
				} else {
						findAll(2);
						initUpdatePokemon();
				}
				
		}
	});
}


function initDataGrid(){
	// Register listeners
	$('#btn-search').click(function() {
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
	var search =function(searchKey) {
		$('#pokemon-row').empty();
		if (searchKey == '') 
			findAll(0);
		else
			findByName(searchKey);
	};	

	var findByName= function(searchKey) {
		console.log('findByName: ' + searchKey);
		$.ajax({
			type: 'GET',
			url: rootURL + '/search/' + searchKey,
			dataType: "json",
			success: function(data){
				renderGrid(data);
				console.log('data by name'+data);
			}
		});
		
	};
}


var  findByUsername= function(username) {
	var userData;
	console.log('findByUsername: ' + username);
	$.ajax({
		type: 'GET',
		url: rootURL + '/login/search/'+username+'/', 
		
		dataType: "json",
		async: false,
		success: function (data) {
			$('#btnLogout').show();
			userData = data
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("User doesnt exist!")
		}
	});
	console.log('userData'+userData);
	return userData;
 };
 
function clearUsernameAndPasswordField(){
		$('#username').val('');
		$('#password').val('');
}


$('#btnGo').click(function () {
	login();
	return false;
});

$('#btnLogout').click(function () {
	logout();
	$('#btnLogout').hide();

	return false;	// this cancels the default action of the browser
});



function findAll(id) {
	$.ajax({
		type : 'GET',
		url : rootURL,
		dataType : "json",
		success : function(data) {
			dataJson = data;
			if (id == 2) {
				renderDataTable(data);
			} else {
				renderGrid(data);
			}
		}
	});
}

function findById(id) {
	$.ajax({
		type : 'GET',
		url : rootURL + '/' + id,
		dataType : "json",
		success : function(data) {
			$('#pokeId').val(data.id);
			$('#name').val(data.name);
			$('#gender').val(data.gender);
			$('#category').val(data.category);
			$('#evolution').val(data.evolution);
			$('#attack').val(data.attack);
			$('#region').val(data.region);
			$('#poke-img').val(data.img);
		}
	});
}

function renderGrid(data) {

	$(data).each(function(i, pokemon) {
		append(pokemon);
	});
}

function append(pokemon) {

	var ptLocal;
	console.log('ptLocal');
	console.log($('#pokemon-item').length);
	if( $('#pokemon-item').length == 0 ){
		ptLocal = pt.clone();
	}else{
		ptLocal = $('#pokemon-item').clone();
	}

	ptLocal.find('.pokemon-name').text(pokemon.name);
	ptLocal.find('.pokemon-description').text(pokemon.description);
	ptLocal.find('.pokemon-category').text(pokemon.category);
	ptLocal.find('.pokemon-attack').text(pokemon.attack);
	ptLocal.find('.pokemon-id').text(pokemon.id);
	ptLocal.attr('id', 'pokemon-id-' + pokemon.id)
	ptLocal.find('.pokemon-image').attr('src', pokemon.img);
	console.log(pokemon.img);
	
	ptLocal.show();
	
	$('#pokemon-row').append(ptLocal);

}

//Replace broken images with generic 
$('.pokemon-image').on('error', function(){
    $('.pokemon-image').replaceWith("img/generic.jpg");
  });

function renderDataTable(data) {
	console.log(dataJson);
	$('#table_id-1')
			.DataTable(
					{
						"paging" : true,
						"searching" : true,
						"retrieve" : true,
						"processing" : true,
						"data" : data,
						"columns" : [ {
							"data" : "id"
						}, {
							"data" : "name"
						}, {
							"data" : "category"
						}, {
							"data" : "gender"
						}, {
							"data" : "evolution"
						}, {
							"data" : "attack"
						}, {
							"data" : "region"
						}, {
							"data" : "id"
						}, ],
						"columnDefs" : [
								{
									visible : true,
									targets : 0,
									className : 'dt-center',
									render : function(data, type, full, meta) {
										return data;
									}
								},
								{
									visible : true,
									targets : 1,
									className : 'dt-center',
									render : function(data, type, full, meta) {
										return data;
									}
								},
								{
									visible : true,
									targets : 2,
									className : 'dt-center',
									render : function(data, type, full, meta) {
										return data;
									}
								},
								{
									visible : true,
									targets : 3,
									className : 'dt-center',
									render : function(data, type, full, meta) {
										return data;
									}
								},
								{
									visible : true,
									targets : 4,
									className : 'dt-center',
									render : function(data, type, full, meta) {
										return data;
									}
								},
								{
									visible : true,
									targets : 5,
									className : 'dt-center',
									render : function(data, type, full, meta) {
										return data;
									}
								},
								{
									visible : true,
									targets : 6,
									className : 'dt-center',
									render : function(data, type, full, meta) {
										return data;
									}
								},
								{
									visible : true,
									targets : 7,
									className : "dt-center",
									render : function(data, type, full, meta) {
										return '<a href="#" data-identity="'+ data + '" class="btn btn-info btn-flat delete" data-toggle="modal" data-target="#pokemon-update-modal">Edit</a>'
											   +'<a href="#" data-identity="'+ data + '" class="btn btn-info btn-flat delete" data-toggle="modal" data-target="#pokemon-delete-modal">Delete</a>'; 
									}
								} ],

					});
}

function initUpdatePokemon() {
	var newpoke=false;
    //MODAL UPDATE
	$('#pokemon-update-modal').on('hidden.bs.modal', function() {
		console.log('hide.bs.modal');
		$('#pokeId').val("");
		$('#name').val("");
		$('#gender').val("");
		$('#category').val("");
		$('#evolution').val("");
		$('#attack').val("");
		$('#region').val("");
		$('#poke-img').val("");
	});

	$('#pokemon-update-modal').on('show.bs.modal', function(event) {
		console.log('show.bs.modal');
		var actionLink = $(event.relatedTarget);
		var pokeId = actionLink.data('identity');
		if (pokeId>0) {
		findById(pokeId);
		newpoke = false;
		$('#pokeId').attr('disabled','disabled');
		}else{
			newpoke = true;
			$('#pokeId').removeAttr('disabled');
		}	
		console.log('pokeId :' + pokeId);
		
	});

	var formToJSON = function() {
		return JSON.stringify({
			"id" : $('#pokeId').val(),
			"name" : $('#name').val(),
			"gender" : $('#gender').val(),
			"category" : $('#category').val(),
			"evolution" : $('#evolution').val(),
			"attack" : $('#attack').val(),
			"region" : $('#region').val(),
			"img" : $('#poke-img').val()
		});
	};

	$('#btn-save').on('click', function(e) {
		if (newpoke){
			$.ajax({
				type : 'POST',
				contentType : 'application/json',
				url : rootURL ,
				dataType : "json",
				data : formToJSON(),
				success : function(response) {
					alert('Pokemon created successfully');
					if ($.fn.dataTable.isDataTable('#table_id-1')) {
						var table = $('#table_id-1').DataTable();
						table.destroy();
						table.clear();
					}
					findAll(2);
					$('#pokemon-update-modal').modal("hide");
				}
			})	
		}else{
			var pokeId = $('#pokeId').val();
			console.log('click' + pokeId);
			console.log(formToJSON());
			$.ajax({
				type : 'PUT',
				contentType : 'application/json',
				url : rootURL + '/' + pokeId,
				dataType : "json",
				data : formToJSON(),
				success : function(response) {
					alert('Pokemon updated successfully');
					if ($.fn.dataTable.isDataTable('#table_id-1')) {
						var table = $('#table_id-1').DataTable();
						table.destroy();
						table.clear();
					}
					findAll(2);
					$('#pokemon-update-modal').modal("hide");
				}
			})
	     }
	});
	
	//MODAL DELETE
	$('#pokemon-delete-modal').on('hidden.bs.modal', function() {
		$('#delpokeId').val("");
		console.log('hide.bs.modal');
	});

	$('#pokemon-delete-modal').on('show.bs.modal', function(event) {
		var actionLink = $(event.relatedTarget);
		var pokeId = actionLink.data('identity');
		$('#delpokeId').val(pokeId);
		
	});

	$('#btn-delete').on('click', function(e) {	
		var pokeId = $('#delpokeId').val();
		$.ajax({
			type : 'DELETE',
			url : rootURL + '/' + pokeId,
			success : function(response) {
				if ($.fn.dataTable.isDataTable('#table_id-1')) {
					var table = $('#table_id-1').DataTable();
					table.destroy();
					table.clear();
				}
				findAll(2);
				$('#pokemon-delete-modal').modal("hide");
			}
		})
	});
}
