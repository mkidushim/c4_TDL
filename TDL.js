$(document).ready(function() {
    var title = $('input#title').val();
    var summary = $('input#summary').val();
    var date = $('input#date').val();
   $.ajax({

            method: 'GET',
            url: 'get_todo_item.json',
            dataType: 'script',
            cache: false,
            crossDomain: true,
            success: function(response) {
                console.log('success:', response)
                console.log('todo_items:', todo_items)
                $('#one').html(todo_items[0].title)
                $('#one_s').html(todo_items[0].details)
                $('#two').html(todo_items[1].title)
                $('#two_s').html(todo_items[1].details)
                 $('#three').html(todo_items[2].title)
                $('#three_s').html(todo_items[2].details)
            }

        })

    $('body').on('click', '#add', function() {
        console.log("button worked")
        
        $.ajax({

            method: 'GET',
            url: 'http://localhost/lf_projects/MySandbox%20/c4_TDL/get_todo_item.json',
            dataType: 'script',
            cache: false,
            crossDomain: true,
            success: function(response) {
                console.log('success:', response)
                console.log('todo_items:', todo_items[0])
                $('h5#one').html(todo_items[0].title)
                $('p#one_s').html(todo_items[0].details)
                $('#two').html(todo_items[1].title)
                $('#two_s').html(todo_items[1].details)
                 $('#three').html(todo_items[2].title)
                $('#three_s').html(todo_items[2].details)
            }

        })



    });
});
