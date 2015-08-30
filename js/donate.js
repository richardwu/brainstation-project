$(function(){
	$('.expand-charity').on('click', function(){
		console.log($(this).closest('.collapse-group').find('.collapse'));
		$(this).closest('.collapse-group').find('.collapse').collapse('toggle');
		if ($(this).hasClass('fui-triangle-down')){
			$(this).removeClass('fui-triangle-down');
			$(this).addClass('fui-triangle-up');
		}
		else {
			$(this).removeClass('fui-triangle-up');
			$(this).addClass('fui-triangle-down');
		}
	});
});