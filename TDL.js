	var title = $('#title').val();
	var summary = $('#summary').val();
	var date = $('#date').val();

	$(document).ready(function() {
$('body').on('click', '#add', function(){
	$.ajax({
			method: 'POST'
            url: 'get_todo_item_server.json',
            dataType: 'json',
            cache: false,
            success: function(response) {
                console.log('success:', response)
            }
        });

	})
