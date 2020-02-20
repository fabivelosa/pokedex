$(document).ready(function() {
	alert("I'm ready");
	$('#button').on('click', function() {
		alert("button clicked!");
		var price = $('<p>From $399.99</p>');
	});
});