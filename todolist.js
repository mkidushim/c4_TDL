function addListItem() {
	console.log("in the add")
	var text = $('#add-item').val();
	console.log('text=', text);
  
	$("#list-item").append("<li>" + "<input type= "+"'checkbox'"+" class="+"'item_done'"+">"+text+" <"+"button "+"class= "+"'delete_btn'"+">"+"Delete"+"</button>"+"</li>");
        


    //$('#add-item').val("");

 

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



$(function() {
	console.log('loading');
	$('#add-btn').on('click',addListItem);

	console.log("before delete button onclick");
	//$('.delete_btn').on('click',deleteListItem);
    $(document).on('click', '.delete_btn', deleteListItem);
	//$('.delete_btn').on('click',deleteListItem);


	console.log("before checkbox button onclick");
	$(document).on('click','.item_done',crossOutListItem);
	//$(".item_done").on('click','crossOutListItem);




});



   