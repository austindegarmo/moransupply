$(document).ready(function(){

	  $('#contractor').click(function() {
		window.location.assign("contractors/contractors.html");
	});


	  $('#homeowners').click(function() {
	  	window.location.assign("homeowners/homeowners.html");
	  });

	  $('#pills-contractors-tab').on('click', function (e) {
		e.preventDefault()
		$(this).tab('show')
		console.log("Got to the end")
	  })
});


