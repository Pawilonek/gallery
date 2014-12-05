function save(ui){

}

$(function() {
	$(".image").draggable({
		containment: "parent",
		scroll: false,
		stop: function(e, ui) {
			console.log(ui.helper.context.id);
			console.log(ui.position);
		}
	}).resizable({
		containment: "#gallery",
		aspectRatio: true,
		handles: "s, e",
		stop: function(e, ui) {
			console.log(ui.helper.context.id);	
			console.log(ui.size);
		}
	});
});