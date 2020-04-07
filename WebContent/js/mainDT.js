
var rootURL = "http://localhost:8080/Pokedex/rest/pokedex";

//jQuery object is $
$(document).ready(function() {
	findAll();
});

var findAll = function() {
	
	// ajax request or HTTPRequest - sent asynchrounous
	// jQuery method ajax
	// when HTTPResponse with status code 200 or 204 call function renderList
	$.ajax({
		type: 'GET',
		url: rootURL,
		dataType: "json",
		success: function(data) {
			list=data.pokedex;
			$('#table_id').DataTable({
				"processing": true,
				"data": data,
				"columns": [      
		            { "data": "name" },
		            { "data": "gender" },
		            { "data": "evolution" },
		            { "data": "attack" },
		        ],
		     	"columnDefs": [
                {//name
                    visible: true,
                    targets: 0,
                    className: 'dt-center',
                    render: function (data, type, full, meta) {
                        return  data;
                    }
                },
                {//gender
                    visible: true,
                    targets: 1,
                    className: 'dt-center',
                    render: function (data, type, full, meta) {
                        return  data;
                    }
                },
                {//evolution
                    visible: true,
                    targets: 2,
                    className: 'dt-center',
                    render: function (data, type, full, meta) {
                        return  data;
                    }
                },
                {//attack
                    visible: true,
                    targets: 3,
                    className: 'dt-center',
                    render: function (data, type, full, meta) {
                        return  data;
                    }
                },
                {//action
                    visible: true,
                    targets: 4,
                    className: "dt-center",
                    render: function (data, type, full, meta) {
                          
                      return '<button id="editBtn" class="btn btn-wrang btn-flat edit" name="editBtn" type="button">Edit</button>' +
                            '&nbsp;&nbsp;<button id="deleteBtn" class="btn btn-danger btn-flat delete" name="deleteBtn" type="button" >Delete</button>';
                        
                    }
                }
            ],
			
			});
		}
	});
	
}






