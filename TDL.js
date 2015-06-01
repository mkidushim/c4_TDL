$(document).ready(function() {
    var title = $('input#title').val();
    var summary = $('input#summary').val();
    var date = $('input#date').val();
    $('body').on('click', '#add', function() {
        console.log("button worked")
        
        $.ajax({

            method: 'GET',
            url: 'http://localhost/lf_projects/MySandbox%20/c4_TDL/get_todo_item.json',
            dataType: 'JSON',
            cache: false,
            crossDomain: true,
            success: function(response) {
                console.log('success:', response)
                $('h5#one').html(JSON.stringify(todo_items[0]))
            }

        })



    });
});
