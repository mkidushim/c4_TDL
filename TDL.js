var todo_items_list = [];
var todo_items_object = {
    title: null,
    details: null,
    timeStamp: null,
    id: null
};
var todo_items_array = [];
var update_array = [];
var session;
var name_user;


function todo_initialize() {
        var todo_initialize = Object.create(todo_items_object);
        todo_initialize.title = $('#title_LI').val();
        todo_initialize.details = $('#details_LI').val();
        todo_initialize.timeStamp = parseFloat($('#timeStamp_LI').val());
        console.log("todo_object: ", todo_items_object);
        todo_items_array.push(todo_initialize);
    }
    //Parris sort function
function sort_todo(a, b) {
        if (parseFloat(a.timeStamp) < parseFloat(b.timeStamp))
            return -1;
        if (parseFloat(a.timeStamp) > parseFloat(b.timeStamp))
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
            data_index: i,
            text: 'Delete'
        });

        var p1_button = $("<button>", {
            type: 'button',
            class: 'button',
            text: "Details",
            data_index: i
        });

        var complete_button = $('<button>').attr('type', 'button').text('complete').attr('data_index', i);

        var update_button = $('<button>').attr('type', 'button').text('update').attr('data_index', i);

        // var p2_button = $("<button>", {
        //     type: 'button',
        //     class: 'button',
        //     text: "priority 2",
        //     data_index: i
        // });

        // var p3_button = $("<button>", {
        //     type: 'button',
        //     class: 'button',
        //     text: "priority 3",
        //     data_index: i
        // });

        // var p4_button = $("<button>", {
        //     type: 'button',
        //     class: 'button',
        //     text: 'priority 4',
        //     data_index: i
        // });

        var postId_num = $("<li>", {
            class: 'list_item_num list-group-item',
            text: "Post Id number: " + todo_items_array[i].id,
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
            text: "Title: " + todo_items_array[i].title + " postID: " + todo_items_array[i].id,
        });

        var details = $("<li>", {
            class: 'to_do_details list-group-item',
            text: "details: " + todo_items_array[i].details,
        });

        var selected_timeStamp = Date.parse(todo_items_array[i].timeStamp);
        var dateInMS = Date.now();
        if (selected_timeStamp < dateInMS) {
            $('.to_do_title').addClass('pastDue')
        }
        if (todo_items_array[i].complete == 1) {
            $(title).addClass('completed_item');
        }
        // $(TD_item).append(list_item_num, title, details, timestamp, delete_button, p1_button, p2_button, p3_button, p4_button);
        $(TD_item).append(title, p1_button, update_button, complete_button, delete_button)
        $('#display_list').append(TD_item);

        delete_button.click(function() {
            console.log(todo_items_array[1])
            var index = $(this).parent().attr('data_index');
            console.log("list item ", index + ' was clicked');

            todo_items_array.splice(index, 1);
            populate_todo_list();
            $.ajax({
                dataType: 'json',
                url: 'http://s-apis.learningfuze.com/todo/delete',
                method: 'POST',
                data: {
                    userId: global_response.data[index].userId,
                    postId: global_response.data[index].id,
                },
                cache: false,
                crossDomain: true,

                success: function(response) {

                    console.log(response)
                }
            });
        });
        p1_button.click(function() {
            $('.modal-header').html('');
            $('.modal-body').html('');
            var index = $(this).parent().attr('data_index');
            var title_display = $('<div>').html('title : ' + todo_items_array[index].title);
            var details_display = $('<div>').html('details : ' + todo_items_array[index].details);
            var timestamp_display = $('<div>').html('time : ' + todo_items_array[index].timeStamp);
            var postId_display = $('<div>').html('PostId : ' + todo_items_array[index].id);
            $('.modal-header').append(title_display);
            $('.modal-body').append(details_display, timestamp_display, postId_display);
            $('#myModal').modal('show');
        })

        update_button.click(function() {
            $('.modal-title').html('')
            $('.modal-body').html('');
            update_array = [];
            var index = $(this).parent().attr('data_index');
            update_array.push(todo_items_array[index]);
            var title_update = $('<input>').attr('type', 'text').attr('placeholder', 'title').addClass('title_update col-xs-7 col-md-7');
            var details_update = $('<input>').attr('type', 'text').attr('placeholder', 'details').addClass('details_update col-xs-7 col-md-7');
            var time_update = $('<input>').attr('type', 'datetime-local').attr('placeholder', 'duedate').addClass('time_update col-md-7');
            var submit_update = $('<button>').attr('type', 'submit').text('submit').addClass('col-md-3 col-md-offset-4');

            submit_update.click(update_item);
            $('.modal-title').html('Update for : ' + update_array[0].title)
            $('.modal-body').append(title_update, details_update, time_update, submit_update);
            $('#myModal').modal('show');
        });
        //***********complete function needs to be added******************//
        complete_button.click(function() {
            update_array = [];
            var index = $(this).parent().attr('data_index');
            update_array.push(todo_items_array[index]);
            if (update_array[0].complete == 0) {
                update_array[0].complete = 1;
                populate_todo_list();
            } else if (update_array[0].complete == 1) {
                update_array[0].complete = 0;
                populate_todo_list();
            }

            item_complete_function();

        });

        //***********complete function needs to be added******************//





        // this is being worked on to add priority
        // p1_button.click(function() {
        //     var index = $(this).parent().attr('data_index');
        //     console.log("list item ", index + ' was clicked');
        //     $(TD_item).addClass('list-group-item list-group-item-danger');
        //     populate_todo_list();
        // });

        // p2_button.click(function() {
        //     var index = $(this).parent().attr('data_index');
        //     console.log("list item ", index + ' was clicked');
        //     var priority = $(this).parent().addClass('list-group-item list-group-item-warning');
        //     populate_todo_list();
        // });

        // p3_button.click(function() {
        //     var index = $(this).parent().attr('data_index');
        //     console.log("list item ", index + ' was clicked');
        //     var priority = $(this).parent().addClass('list-group-item list-group-item-info');
        //     populate_todo_list();
        // });

        // p4_button.click(function() {
        //     var index = $(this).parent().attr('data_index');
        //     console.log("list item ", index + ' was clicked');
        //     var priority = $(this).parent().addClass('list-group-item list-group-item-success');
        //     populate_todo_list();
        // });
    }
}

function populate_todo_single() {
    $('#display_list').empty();
    var iLN = parseFloat($('#input_search_id').val());
    console.log("item list number chosen: ", iLN);
    console.log("todo_items_array: ", todo_items_array);
    // for (var i = iLN; i < (iLN + 1); i++) {
    $('#display_list').empty();
    var TD_item = $("<ul>", {
        class: 'TD_item list-group',
        id: todo_items_array[0].id,
        data_index: 0
    });

    var delete_button = $("<button>", {
        type: 'button',
        text: 'Delete',
        data_index: 0
    });

    var p1_button = $("<button>", {
        type: 'button',
        class: 'button',
        text: "Details",
        data_index: 0
    });

    var complete_button = $('<button>').attr('type', 'button').text('complete').attr('data_index', 0);

    var update_button = $('<button>').attr('type', 'button').text('update').attr('data_index', 0);

    var postId_num = $("<li>", {
        class: 'list_item_num list-group-item',
        text: "Post Id number: " + todo_items_array[0].id,
    });

    var list_item_num = $("<li>", {
        class: 'list_item_num list-group-item',
        text: "list item number: " + (1)
    });

    var timestamp = $("<li>", {
        class: 'to_do_timestamp list-group-item',
        text: "time: " + todo_items_array[0].timeStamp,
    });

    var title = $("<li>", {
        class: 'to_do_title list-group-item',
        text: "title: " + todo_items_array[0].title + " Post_Id: " + todo_items_array[0].id,
    });

    var details = $("<li>", {
        class: 'to_do_details list-group-item',
        text: "details: " + todo_items_array[0].details,
    });

    var selected_timeStamp = Date.parse(todo_items_array[0].timeStamp);
        var dateInMS = Date.now();
        if (selected_timeStamp < dateInMS) {
            $('.to_do_title').addClass('pastDue');
        }
    if (todo_items_array[0].complete == 1) {
        $(title).addClass('completed_item');
    }
    // $(TD_item).append(list_item_num, title, details, timestamp, delete_button, p1_button, p2_button, p3_button, p4_button);
    $(TD_item).append(title, p1_button, update_button, complete_button, delete_button)
    $('#display_list').append(TD_item);

    delete_button.click(function() {
        console.log(todo_items_array[0])
        var index = $(this).parent().attr('data_index');
        console.log("list item ", index + ' was clicked');

        todo_items_array.splice(index, 1);
        populate_todo_list();
        $.ajax({
            dataType: 'json',
            url: 'http://s-apis.learningfuze.com/todo/delete',
            method: 'POST',
            data: {
                userId: response.Id,
                postId: global_response.data[0].id,
            },
            cache: false,
            crossDomain: true,

            success: function(response) {
                console.log(response)
            }
        });
    });
    p1_button.click(function() {
        $('.modal-body').html('');
        var index = $(this).parent().attr('data_index');
        var title_display = $('<div>').html('title : ' + todo_items_array[index].title);
        var details_display = $('<div>').html('details : ' + todo_items_array[index].details);
        var timestamp_display = $('<div>').html('time : ' + todo_items_array[index].timeStamp);
        var postId_display = $('<div>').html('postId : ' + todo_items_array[index].id);

        $('.modal-body').append(title_display, details_display, timestamp_display, postId_display);
        $('#myModal').modal('show');
    })

    update_button.click(function() {
        $('.modal-body').html('');
        update_array = [];
        var index = $(this).parent().attr('data_index');
        update_array.push(todo_items_array[index]);
        var title_update = $('<input>').attr('type', 'text').attr('placeholder', 'title').addClass('title_update');
        var details_update = $('<input>').attr('type', 'text').attr('placeholder', 'details').addClass('details_update');
        var time_update = $('<input>').attr('type', 'text').attr('placeholder', 'duedate').addClass('time_update');
        var postId_display = $('<div>').html('postId : ' + todo_items_array[index].id);

        var submit_update = $('<button>').attr('type', 'submit').text('submit');

        submit_update.click(update_item);

        $('.modal-body').append(title_update, details_update, time_update, submit_update, postId_display);
        $('#myModal').modal('show');
    });
    complete_button.click(function() {
        update_array = [];
        var index = $(this).parent().attr('data_index');
        update_array.push(todo_items_array[index]);
        if (update_array[0].complete == 0) {
            update_array[0].complete = 1;
            populate_todo_list();
        } else if (update_array[0].complete == 1) {
            update_array[0].complete = 0;
            populate_todo_list();
        }

        item_complete_function();

    });

}

function postId_single() {
    console.log("ajax call");
    $.ajax({
        dataType: 'json',
        url: 'http://s-apis.learningfuze.com/todo/getByPostId',
        method: 'POST',
        data: {
            postId: $('#input_search_id').val(),
        },
        cache: false,
        crossDomain: true,

        success: function(response) {
            global_1response = response.data;
            console.log('postid response : ', global_1response);
            todo_items_array = [];
            global_1response = response;
            todo_items_array = todo_items_array.concat(global_1response.data);
            console.log("response: ", global_1response);
            console.log('todo_items_array: ', todo_items_array);
            populate_todo_single();

        }

    });

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
                    delete
                    load_user_data();
                    document.cookie = 'sessionid=' + response.session_id;
                    document.cookie = 'username=' + response.username;
                    $('.alert').remove();
                } else if (!response.success) {
                    $('.alert').remove();
                    var alert = $('<div>').addClass('alert alert-danger').html(response.errors[0]);
                    $('.form_container').append(alert);

                }
            }
        });
    }
    //used to validate username and password before login is successfull
    // I am not sure what function needs to run on login success commented out so logout would work
    //MK - created logout_server() function
    //MK- 06/04/15 Fixed logout
function logout_server() {
    console.log("ajax logout");
    console.log('sesssion id#', session)
    $.ajax({
        dataType: 'json',
        url: 'http://s-apis.learningfuze.com/todo/logout',
        data: {
            sid: getCookie('sessionid'),
            username: getCookie('username').toLowerCase(),
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
                $('.list_container .alert.alert-danger').remove();

            })
            $('#single_pull_json').click(function() {
                get_TDL_json_populate_single();


            })
            $('#add_LI').click(send_list_items);

            populate_success_data();

            $('#sort_button').click(function() {
                console.log(todo_items_array.sort(sort_todo));
                todo_items_array.sort(sort_todo);
                populate_todo_list
            });
            get_TDL_json_populate_multiple();
            $('#search_id_button').click(function() {
                postId_single();
            })

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
                $('#login_button').click(login_to_server);
                $('#create_account_button').click(function() {
                    log_to_creation_page();
                })
            }
        })
    }
    //adding glyph color to create page

function log_to_creation_page() {
    $.ajax({
        dataType: 'html',
        url: 'creation_page.html',
        cache: false,
        success: function(response) {
            $('.container').html('');
            $('.container').html(response);

            
            $("form input").change(function() {
                validate_create();
            });
            $('#validate_new_account').click(function() {
                create_account();
            })
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
            } else if (!response.success) {
                console.log("error:", response.errors)
                $('.alert').remove();
                var alert = $('<div>').addClass('alert alert-danger').html(response.errors);
                $('.list_container').append(alert);
            }
        }

    });
}

function create_account() {
    $.ajax({
        dataType: 'json',
        data: {
            username: $('#N_user_name').val().toLowerCase(),
            password: $('#N_password1').val(),
            password2: $('#N_password2').val(),
            email: $('#N_user_email').val(),
            firstName: $('#N_first_name').val(),
            lastName: $('#N_last_name').val(),
        },
        method: 'POST',
        url: 'http://s-apis.learningfuze.com/todo/newAccount',
        cache: false,
        crossDomain: true,
        success: function(response) {
            window.response = response;
            if (response.success) {
                console.log('Success:', response.success);
                logout_to_mainpage();

            } else if (!response.success) {
                console.log('failed:', response.errors);
                $('.alert').remove();
                var alert = $('<div>').addClass('alert alert-danger').html(response.errors[0]);
                $('#creation_div > form').append(alert);
            }
        }

    });
}

function update_item() {
    console.log('ajax getting called')
    $.ajax({
        dataType: 'json',
        data: {
            postId: update_array[0].id,
            title: $('.title_update').val(),
            dueDate: $('.time_update').val(),
            details: $('.details_update').val(),
            userId: update_array[0].userId,
        },
        method: 'POST',
        url: 'http://s-apis.learningfuze.com/todo/update',
        cache: false,
        crossDomain: true,
        success: function(response) {
            window.response = response;
            if (response.success) {
                $('.modal-body').html('')
                $('.modal-body').html('Your item has been updated!');
                $('#myModal').modal('show');
                get_TDL_json_populate_multiple();

            } else if (!response.success) {
                $('.alert').remove();
                var alert = $('<div>').addClass('alert alert-danger').html(response.errors[0]);
                $('.modal-body').append(alert);
            }


        }

    });
}

function item_complete_function() {
    $.ajax({
        dataType: 'json',
        data: {
            postId: update_array[0].id,
            complete: update_array[0].complete,
        },
        method: 'POST',
        url: 'http://s-apis.learningfuze.com/todo/updateCompleteStatus',
        cache: false,
        crossDomain: true,
        success: function(response) {
            window.response = response;
            if (response.success) {
                console.log(response);

            } else if (!response.success) {
                console.log(response)
                $('.alert').remove();
                var alert = $('<div>').addClass('alert alert-danger').html(response.errors);
                $('.modal-body').append(alert);
            }


        }

    });
}

function keep_user_logged_in() {
    $.ajax({
        dataType: 'json',
        data: {
            session_id: getCookie('sessionid'),
        },
        method: 'POST',
        url: 'http://s-apis.learningfuze.com/todo/getLoggedInUserInfo',
        cache: false,
        crossDomain: true,
        success: function(response) {
            window.response = response;
            if (response.success) {
                console.log(response);
                load_user_data();

            } else if (!response.success) {

                logout_to_mainpage();

            }


        }

    });
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}



$(document).ready(function() {
    $('#create_account_button').click(function() {
        log_to_creation_page();
    })

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

    
    keep_user_logged_in();


});

//Parris function creation to populate DOM with response object data

function populate_success_data() {
    $('#email').html('Email : ' + response.email);
    $('#lastName').html(response.lastName);
    $('#firstName').html(response.firstName);
    $('#id').html(response.id)
}

function validate_create() {
    $.ajax({
        dataType: 'json',
        data: {
            username: $('#N_user_name').val(),
            password: $('#N_password1').val(),
            password2: $('#N_password2').val(),
            email: $('#N_user_email').val(),
            firstName: $('#N_first_name').val(),
            lastName: $('#N_last_name').val()
        },
        method: 'POST',
        url: "http://s-apis.learningfuze.com/todo/validateUserInfo",
        cache: false,
        crossDomain: true,
        success: function(response) {
            $("form").change(function() {
                $('form span').addClass('glyphicon glyphicon-check')
            });
            window.validate_response = response;
            if (validate_response.success == true) {
                $("form input").change(function() {
                    $('form span').addClass('glyphicon glyphicon-check green')
                });
                console.log('validate:', validate_response)
            } else if (validate_response.success == false) {
                $('form span').addClass('glyphicon glyphicon-check')
                console.log('validate:', validate_response)
            }
        }
    });



}
