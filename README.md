# c4_TDL
I created a To Do List web application along with 3 other people.  I was the team leader in charge of dividing up the tasks as well as keeping track of issues pull requests and merging on git through the terminal.  Below is a list of the features we had to include to complete the challenge. 

#Live Version: http://52.26.217.22/c4_TDL/


#Feature List
- login
	- User should be able to log into their account with a username / password
	- Incorrect usernames/passwords should return an error message provided by the server
	- Correct logins should result in users being shown/directed to a landing page for their todo items
	
- logout
	- User should be able to log out of their account
	- Logging out would show / direct the user towards a default landing page for non-logged in users
	
- account creation
	- User should be able to create a user account including:
		- user name (must not already exist)
		- password (must be a valid password)
		- confirmation password (must be the same as password)
		- first name (must be at least 2 characters)
		- last name (must be at least 2 characters)
		- user email (must be a valid email)
 	- request URL: http://s-apis.learningfuze.com/todo/newAccount
 	- input (POST):
		- username: string - chosen username
		- password: string - chosen password
		- password2: string - verification of password
		- email: string - user’s email address
		- firstName: string - user’s first name
		- lastName: string - user’s last name
	- output (JSON):
		- success: boolean - true or false
		- errors: array - array of error messages, if any
	
- Create todo item
	- User should be able to create a new todo item with:
		- title
		- due date
		- details

- List all todo items
	- User should be able to see all of their todo items
	- User should be able to filter those that are past the due date / completed

- Show individual todo item
	- Focus on one todo item
	- does not leave the original list.  Allows one item to be viewed in greater detail and then closed without modifying list

- Delete individual todo item
	- request URL: http://s-apis.learningfuze.com/todo/delete
	- input (POST):
		- postId: id of the todo item to delete
		- userId: user id of the post to delete
	- output (JSON):
			- success: boolean - true or false
			- msgs: string - success message
			- errors: array - error messages
