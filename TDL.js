var todo_items_list = [];
var todo_items_object = {
    title: null,
    details: null,
    timeStamp: null,
    id: null
};
var todo_items_array = [];
var login_clicked = true;

function todo_initialize() {
    var todo_initialize = Object.create(todo_items_object);
    todo_initialize.title = $('#title_LI').val();
    todo_initialize.details = $('#details_LI').val();
    todo_initialize.timeStamp = parseFloat($('#timeStamp_LI').val());
    console.log("todo_object: ", todo_items_object);
    todo_items_array.push(todo_initialize);
}
//Parris sort function
function sort_todo(a,b) {
  if (parseFloat(a.list_item_num) < parseFloat(b.list_item_num))
    return -1;
  if (parseFloat(a.list_item_num) > parseFloat(b.list_item_num))
    return 1;
  return 0;
}
//Parris end sort function


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
        url: 'http://s-apis.learningfuze.com/todo/get',
        method: 'POST',
        data: {
            userId: parseFloat($('#id').html()),
        },
        cache: false,
        crossDomain: true,

        success: function(response) {
            todo_items_array = [];
            global_response = response;
            todo_items_array = todo_items_array.concat(global_response.data);
            console.log("response: ", global_response);
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
//used to validate username and password before login is successfull
// I am not sure what function needs to run on login success commented out so logout would work
function login_to_server() {
        console.log("ajax call");
        $.ajax({
            dataType: 'json',
            data: {
                username: $('#user_name').val(),
                password: $('#password').val()
            },
            url: 'http://s-apis.learningfuze.com/todo/login',
            method: 'POST',
            cache: false,
            crossDomain: true,
            success: function(response) {
                window.response = response;
                if (response.success) {
                    load_user_data()
                    sesssion = response.session_id;
                    $('.alert').remove();
                } else if (!response.success) {
                    if (login_clicked) {
                          var alert = $('<div>').addClass('alert alert-danger').html('Invalid Username or Password');
                        $('.form_container').append(alert);
                        login_clicked = false;
                    }
                }
            }
        });
    }
    //used to validate username and password before login is successfull
    // I am not sure what function needs to run on login success commented out so logout would work
function login_to_server() {
        console.log("ajax call");
        name_user = $('#user_name').val();
        $.ajax({
            dataType: 'json',
            data: {
                username: $('#user_name').val(),
                password: $('#password').val()
            },
            url: 'http://s-apis.learningfuze.com/todo/login',
            method: 'POST',
            cache: false,
            crossDomain: true,
            success: function(response) {
                window.response = response;
                if (response.success) {
                    load_user_data()
                    sesssion = response.session_id;
                    $('.alert').remove();
                } else if (!response.success) {
                    if (login_clicked) {
                        var alert = $('<div>').addClass('alert alert-danger').html('Invalid Username or Password');
                        $('body').append(alert);
                        login_clicked = false;
                    }
                }
            }
        });
    }
    //MK - created logout_server() function
function logout_server() {
    console.log("ajax logout");
    console.log('sesssion id#', sesssion)
    $.ajax({
        dataType: 'json',
        url: 'http://s-apis.learningfuze.com/todo/logout',
        data: {
            session_id: 'response.session_id',
            user_name: 'name_user',
        },
        method: 'POST',
        cache: false,
        crossDomain: true,
        success: function(response) {
            if (response.success) {
                window.response = response;
                console.log('logout:', response)
                logout_to_mainpage();

            } else if (response.success == false) {
                console.log('logout error:', response.errors)
            }
        }
    });
}

function load_user_data() {
    $.ajax({
        dataType: 'html',
        url: 'multiple_to_do_item.html',
        cache: false,
        success: function(response) {
            $('.container').html('');
            $('.container').html(response);
            $('#logout_button').click(logout_server);
            // $('#add_LI').click(function() {
            //     todo_initialize();
            //     populate_todo_list();
            // });
            $('#pull_json').click(function() {
                get_TDL_json_populate_multiple();

            })
            $('#single_pull_json').click(function() {
                get_TDL_json_populate_single();

            })
            $('#add_LI').click(send_list_items);
            populate_success_data();

            $('#sort_button').click(function(){
                console.log(todo_items_array.sort(sort_todo));
                todo_items_array.sort(sort_todo);
                populate_todo_list
            });

        }
    })
}

function logout_to_mainpage() {
    $.ajax({
        dataType: 'html',
        url: 'login.html',
        cache: false,
        success: function(response) {
            $('.container').html('');
            $('.container').html(response);
            $('#logout_button').click(logout_server);
            $('#login_button').click(login_to_server);
        }
    })
}

function send_list_items() {
    $.ajax({
        dataType: 'json',
        data: {
            title: $('#title_LI').val(),
            dueDate: $('#timeStamp_LI').val(),
            details: $('#details_LI').val(),
            userId: parseFloat($('#id').html()),
        },
        method: 'POST',
        url: 'http://s-apis.learningfuze.com/todo/create',
        cache: false,
        crossDomain: true,
        success: function(response) {
            window.response = response;
            if (response.success) {
                get_TDL_json_populate_multiple();
            }
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
    $('#logout_button').click(logout_server);
});

//Parris function creation to populate DOM with response object data

function populate_success_data() {
    $('#email').html('Email : ' + response.email);
    $('#lastName').html(response.lastName);
    $('#firstName').html(response.firstName);
    $('#id').html(response.id)
}
