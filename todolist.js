 

function addListItem() {
	console.log("in the add")
	var text = $('#add-item').val();
	console.log('text=', text);
  
	$("#list-item").append("<li>" + "<input type= "+"'checkbox'"+" class="+"'item_done'"+">"+text+" <"+"button "+"class= "+"'delete_btn'"+">"+"x"+"</button>"+"</li>");
        
	$('#add-item').val("");
	load_data()

};


function deleteListItem() {
	console.log('in the delete list');
     //$('li').remove();
    $(this).parent().remove();
	 
  

};

function crossOutListItem() {
	console.log('in the crossout clist');
     //$('li').remove();
     if($(this).parent().css('textDecoration') == 'line-through') {
     	 $(this).parent().css('textDecoration', 'none');
     	 console.log("in if before esle");
     }else {
     	 $(this).parent().css('textDecoration', 'line-through');
     }
 
};

function load_data() {

    var objectData = 
 	 {
      id: 0,
      user_id: 1,
      timeStamp: '2015/06/15 12:00:00',
      title: 'get eggs',
      details: 'this is a test'
    };

		console.log("in load data");
		console.log("in load:",$('#add-item').val());
		

			$.ajax({
				url: 'http://localhost/lf_projects/sandbox/c4_TDL/get_todo_items.json',
      			dataType: "json",
      			data: { data: JSON.stringify(objectData) },
      			method: 'POST',
      			async: false,
      			cache: false,
            	crossDomain: true,
            	success: function(response) {

                console.log('success  inside post result - respons==', response);
                //$('#data_display').html(response);
              
            	}

       		 });
    }
  


function get_data() {
	console.log("in data");
  	
    var save_todo_items =[
    {
      id: 0,
      user_id: 1,
      timeStamp: '2015/06/15 12:00:00',
      title: 'get eggs',
      details: 'get jumbo eggs from the supermarket'
    },
    {
      id: 1,
      user_id: 1,
      timeStamp: '2015/06/16 04:00:32',
      title: 'win at life',
      details: 'by winning the lottery'
    },
        {
      id: 2,
      user_id: 1,
      timeStamp: '2015/11/17 11:22:00',
      title: 'proposition parris',
      details: 'to go to the zoo'
    },
 ];
	 console.log("save_todo_items:", JSON.stringify(save_todo_items));

      var item_array = [];

	  $.ajax({
        dataType: 'json',
        url: 'http://localhost/lf_projects/sandbox/c4_TDL/get_todo_items.json',
        method: 'GET',
        cache: false,
        crossDomain: true,
        success: function(response) {
            window.response = response;
                console.log("response id", response[0].id);
                console.log("response user_id", response[0].user_id);
       			console.log("response timeStamp", response[0].timeStamp);
				console.log("response title", response[0].title);
				console.log("response id", response[0].details);
                  var len =  response.length;
                  console.log('djkdj length:',response.length);
                  for(var i=0;i<len;i++ ){
                  	  console.log("response id", response[i].id);
                      console.log("response user_id", response[i].user_id);
       			      console.log("response timeStamp", response[i].timeStamp);
				      console.log("response title", response[i].title);
				      console.log("response id", response[i].details);
                      console.log("in the for loop:", response[i]);
                      $("#list-item").append("<li>" + "<input type= "+"'checkbox'"+" class="+"'item_done'"+">"+response[i].details+" <"+"button "+"class= "+"'delete_btn'"+">"+"x"+"</button>"+"</li>");
         
                    
       			  }
    		} 
   	}); 

};

 


	$( document ).ready(function() {
       console.log('page is loading');
	   get_data();  
      // load_data();
		$('#add-btn').on('click',addListItem);

		console.log("before delete button onclick");
		//$('.delete_btn').on('click',deleteListItem);
	    $(document).on('click', '.delete_btn', deleteListItem);
		//$('.delete_btn').on('click',deleteListItem);


		console.log("before checkbox button onclick");
		$(document).on('click','.item_done',crossOutListItem);
		//$(".item_done").on('click','crossOutListItem);   

}); 

 
	