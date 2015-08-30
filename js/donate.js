$(function(){
	$('.expand-charity').on('click', function(){
		console.log($(this).closest('.collapse-group').find('.collapse'));
		$(this).closest('.collapse-group').find('.collapse').collapse('toggle');
		if ($(this).hasClass('glyphicon-plus')){
			$(this).removeClass('glyphicon-plus');
			$(this).addClass('glyphicon-minus');
		}
		else {
			$(this).removeClass('glyphicon-minus');
			$(this).addClass('glyphicon-plus');
		}
	});
});