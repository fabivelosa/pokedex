/**
 * 
 */
	var rootURL = "http://localhost:8080/Pokedex/rest/pokedex";
	var dataJson;
	
	$(function() {
		$("#tabs").tabs({
			activate : function(event, ui) {
				console.log(ui.newTab.index());
				
				if(dataJson == null){
					ui.newPanel.load(self.findAll(ui.newTab.index()));
				}else{
					if(ui.newTab.index()==1){
						if($('.row .col-lg-3').length <= 1) {
								populateGrid(dataJson);
						}
					}else{
						populateDataTable(dataJson);
						if (! $('#table_id-1').DataTable().data().any()) {
							console.log("table_id-1");
						}
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