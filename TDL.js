var todo_items_list = [];
var todo_items_object = {
    title: null,
    details: null,
    timeStamp: null,
    id: null
};
var todo_items_array = [];

function todo_initialize() {
    var todo_initialize = Object.create(todo_items_object);
    todo_initialize.title = $('#title_LI').val();
    todo_initialize.details = $('#details_LI').val();
    todo_initialize.timeStamp = parseFloat($('#timeStamp_LI').val());
    console.log("todo_object: ", todo_items_object);
    todo_items_array.push(todo_initialize);
}

function populate_todo_list() {
    $('#display_list').empty();
    for (var i = 0; i < todo_items_array.length; i++) {
        var TD_item = $("<ul>", {
            class: 'TD_item list-group',
            id: todo_items_array[i].id,
            data_index: i
        });

        var delete_button = $("<button>", {
            type: 'button',
            class: 'button glyphicon glyphicon-remove-sign',
            data_index: i
        });

        var p1_button = $("<button>", {
            type: 'button',
            class: 'button',
            text: "priority 1",
            data_index: i
        });

        var p2_button = $("<button>", {
            type: 'button',
            class: 'button',
            text: "priority 2",
            data_index: i
        });

       var p3_button = $("<button>", {
            type: 'button',
            class: 'button',
            text: "priority 3",
            data_index: i
        });

        var p4_button = $("<button>", {
            type: 'button',
            class: 'button',
            text: 'priority 4',
            data_index: i
        });

        var list_item_num = $("<li>", {
            class: 'list_item_num list-group-item',
            text: "list item number: " + (i + 1)
        });

        var timestamp = $("<li>", {
            class: 'to_do_timestamp list-group-item',
            text: "time: " + todo_items_array[i].timeStamp,
        });

        var title = $("<li>", {
            class: 'to_do_title list-group-item',
            text: "title: " + todo_items_array[i].title,
        });

        var details = $("<li>", {
            class: 'to_do_details list-group-item',
            text: "details: " + todo_items_array[i].details,
        });

        $(TD_item).append(list_item_num, title, details, timestamp, delete_button, p1_button, p2_button, p3_button, p4_button);
        $('#display_list').append(TD_item);

        delete_button.click(function() {
            var index = $(this).parent().attr('data_index');
            console.log("list item ", index + ' was clicked');
            
            todo_items_array.splice(index, 1);
            populate_todo_list();
        });


// this is being worked on to add priority
        p1_button.click(function() {
            var index = $(this).parent().attr('data_index');
            console.log("list item ", index + ' was clicked');
            $(TD_item).addClass('list-group-item list-group-item-danger');
            populate_todo_list();
        });

        p2_button.click(function() {
            var index = $(this).parent().attr('data_index');
            console.log("list item ", index + ' was clicked');
            var priority = $(this).parent().addClass('list-group-item list-group-item-warning');
            populate_todo_list();
        });

        p3_button.click(function() {
            var index = $(this).parent().attr('data_index');
            console.log("list item ", index + ' was clicked');
            var priority = $(this).parent().addClass('list-group-item list-group-item-info');
            populate_todo_list();
        });

        p4_button.click(function() {
            var index = $(this).parent().attr('data_index');
            console.log("list item ", index + ' was clicked');
            var priority = $(this).parent().addClass('list-group-item list-group-item-success');
            populate_todo_list();
        });
    }
}

function populate_todo_single() {

    var iLN = parseFloat($('#id_LI').val());
    console.log("item list number chosen: ", iLN);
    console.log("todo_items_array: ", todo_items_array);
    for (var i = iLN; i < (iLN + 1); i++) {
        var TD_item = $("<ul>", {
            class: 'TD_item list-group',
            id: todo_items_array[i - 1].id,
            data_index: (i - 1)
        });

        var delete_button = $("<button>", {
            type: 'button',
            class: 'button glyphicon glyphicon-remove-sign',
            data_index: i
        });
        var list_item_num = $("<li>", {
            class: 'list_item_num list-group-item',
            text: "list item number: " + (i)
        });

        var timestamp = $("<li>", {
            class: 'to_do_timestamp list-group-item',
            text: "time: " + todo_items_array[i - 1].timeStamp,
        });

        var title = $("<li>", {
            class: 'to_do_title list-group-item',
            text: "title: " + todo_items_array[i - 1].title,
        });

        var details = $("<li>", {
            class: 'to_do_details list-group-item',
            text: "details: " + todo_items_array[i - 1].details,
        });

        $(TD_item).append(list_item_num, title, details, timestamp, delete_button);
        $('#display_list').append(TD_item);

        delete_button.click(function() {
            var index = $(this).parent().attr('data_index');
            console.log("list item ", index + ' was clicked');
            todo_items_array.splice(index, 1);
            index = $(this).parent().remove();
            //populate_todo_single();
        });
    }
}

function get_TDL_json_populate_multiple() {
    console.log("ajax call");
    $.ajax({
        dataType: 'json',
        url: 'get_todo_items.json',
        method: 'GET',
        cache: false,
        crossDomain: true,

        success: function(response) {
            todo_items_array = [];
            global_response = response;
            todo_items_array = todo_items_array.concat(global_response);
            console.log("response: ", response);
            console.log("response: ", global_response);
            console.log('todo_items_array: ', todo_items_array);
            populate_todo_list();
        }
    });
}

function get_TDL_json_populate_single() {
    console.log("ajax call");
    $.ajax({
        dataType: 'json',
        url: 'get_todo_items.json',
        method: 'GET',
        cache: false,
        crossDomain: true,

        success: function(response) {
            todo_items_array = [];
            global_response = response;
            todo_items_array = todo_items_array.concat(global_response);
            console.log("response: ", response);
            console.log("response: ", global_response);
            console.log('todo_items_array: ', todo_items_array);
            populate_todo_single();
        }
    });
}

function login_to_server() {
    console.log("ajax call");
    $.ajax({
        dataType: 'json',
        data: {username: $('#user_name').val(), password: $('#password').val() },
        url: 'http://s-apis.learningfuze.com/todo/login',
        method: 'POST',
        cache: false,
        crossDomain: true,
        success: function(response) {
            window.response = response;
            $('#display_successful_login').html(response);
        }
    });
}
//MK- created logout_server() function
function logout_server() {
    console.log("ajax logout:");
    $.ajax({
        dataType: 'json',
        data: {username: $('#user_name').val(), password: $('#password').val() },
        url: 'http://s-apis.learningfuze.com/todo/login',
        method: 'POST',
        cache: false,
        crossDomain: true,
        success: function(response) {
            window.response = response;
            $('#display_successful_login').html(response);
        }
    });
}


$(document).ready(function() {
    $('#add_LI').click(function() {
        todo_initialize();
        populate_todo_list();
    });
    $('#pull_json').click(function() {
        get_TDL_json_populate_multiple();

    })
    $('#single_pull_json').click(function() {
        get_TDL_json_populate_single();

    })

    $('#login_button').click(login_to_server);
});

