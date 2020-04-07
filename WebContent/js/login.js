var rootURL = "http://localhost:8080/Pokedex/rest/user";
var user = "";
var ADMIN ="admin";
var CUSTOMER = "customer";

var loginVar = localStorage.getItem('loginVar');


$(document).ready(function () {

	
	if (loginVar == 1){//admin
		
		$('#login').hide();
		$('#adminTab').show();
		$('#customerTab').hide();

		
		
	}else if (loginVar == 2 ){//user
		
		$('#login').hide();
		$('#adminTab').hide();
		$('#customerTab').show();
		
	}else if (loginVar == 0){
		$('#btnLogin').show();
		$('#users').hide();
		$('#btnLogout').hide();
		
	}
	else{
		$('#btnLogin').show();
		$('#users').hide();
		$('#btnLogout').hide();
	}

	
	$('#btnLogin').click(function () {
		login();
	
		return false;
	});

	$('#btnLogout').click(function () {
		logout();
		$('#btnLogout').hide();

		return false;	// this cancels the default action of the browser
	});
});

function logout(){
	clearUsernameAndPasswordField();
	
	loginVar = 0;
	localStorage.setItem('loginVar', 0);
	window.location.reload(true);
};

function login(){
	
	var usernameToCheck=$('#inputUsername').val();
	var passwordToCheck=$('#inputPassword').val();
	if (!usernameToCheck || !passwordToCheck){
		$('#loginError').slideDown().html('<span id="error">You must enter a username and password</span>');	
	}else{
		user = findByUsername(usernameToCheck);
		if(user != null){
			var correctUsername = user.username;
			var correctPassword = user.password;
			if(passwordToCheck == correctPassword){
				userTypeLogin(user.role);
			}else{
				$('#inputPassword').val('');
				$('#loginError').slideDown().html('<span id="error">Invalid Password</span>');	
				$('#btnLogout').hide();
			}

		}else{
			console.log("user error");
			clearUsernameAndPasswordField();
			$('#loginError').slideDown().html("<span>Invalid Username</span>");
			$('#btnLogout').hide();
		}
	}
	return false;
};

var  findByUsername= function(username) {
	var userData;
	console.log('findByUsername: ' + username);
	$.ajax({
		type: 'GET',
		url: rootURL + '/'+username+'/',
		
		dataType: "json",
		async: false,
		success: function (data) {
			$('#btnLogout').show();
			userData = data
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.log("user doesnt exist error")
		}
	});
	return userData;
};

function userTypeLogin(userRole){
	console.log("userTypeLogin "+userRole)
	if (userRole=="admin"){
		user="admin"
		loginVar = 1;
		localStorage.setItem('loginVar', 1);
		console.log("admin")
		 window.location.reload();
	}else if (userRole=="customer"){
		user="customer";
		loginVar = 2;
		localStorage.setItem('loginVar', 2);
		 window.location.reload();
	}
};

function clearUsernameAndPasswordField(){
	$('#inputUsername').val('');
	$('#inputPassword').val('');
};

function loadUserTemplate(userRole){
	hideAll();
	$('#other').show();
	$('#wrapper').empty();
	$("#wrapper").load("templates/"+userRole+".html", function(responseTxt, statusTxt, xhr){
		if(statusTxt == "success")
			console.log(userRole+"sheet loaded");
		if(statusTxt == "error")
			console.log("error on sheet load");
	});
	$('#homePage').show();
	fillSidebar();
	clearUsernameAndPasswordField();
};
