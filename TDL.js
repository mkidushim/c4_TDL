$(document).ready(function() {
    var title = $('#title').val();
    var summary = $('#summary').val();
    var date = $('#date').val();
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
            $('#one_t').html(todo_items[0].timeStamp)
            $('#two').html(todo_items[1].title)
            $('#two_s').html(todo_items[1].details)
            $('#two_t').html(todo_items[1].timeStamp)
            $('#three').html(todo_items[2].title)
            $('#three_s').html(todo_items[2].details)
            $('#three_t').html(todo_items[2].timeStamp)
        }

    })

    $('body').on('click', '#add', function() {
        console.log("button worked")
        $('#list').append($('<a>', {
            class: 'list-group-item',
            id: 'new'
        }));
        $('#new').append($('<h5>', {
            class: 'list-group-item-heading',
            text: $('#title').val(),
            id: 'four'
        }));
        $('#new').append($('<p>', {
            class: 'list-group-item-text',
            text: $('#summary').val(),
            id: 'four_s'
        }));
        $('#new').append($('<p>', {
            class: 'list-group-item-heading',
            text: $('#date').val().replace('T', ' ').replace('-', '/').replace('-', '/') + ':00',
            id: 'four_t'
        }));




    });
});
