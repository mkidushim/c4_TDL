# c4_TDL
To Do List

# TODO 0.1 
- Create dummy static html pages of the following:
    - List a single todo-item
    - List multiple todo-items
    - create a single todo item
- DO NOT spend a lot of time styling them.  You may put in basic bootstrap

# TODO 0.2
- Create dummy data object template for todo items:
<pre>
``` 
todo_items[
    {
      id: 0,
      user_id: 1,
      timeStamp: '2015/06/15 12:00:00',
      title: 'my title',
      details: 'my details'
    }
]
```
</pre>
- Create a local file with json data stored in it, for use with your ajax calls
  - get_todo_items.json
<pre>
``` 
todo_items[
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
```
</pre>
- Add basic functionality to your todo-list project to
    - read whole list and show summary data for available items
    - read individual todo-list item and show it specifically
    - create new data.
        - This will eventually send data to the server
        - For now it will simply append the data to the existing list

# TODO 1.0 (Group Project)
- Combine code together to form a group project
    - Your team master branch will be T&lt;YOUR TEAM NUMBER&gt;_Master
    - Fork C4_TDL to your github account / clone to your system
- LOGIN:
    - add login page
        - 'username' input: holds the name of the user
        - 'password' input: holds hte password of the user
        - 'login' button: triggers the ajax call to the server to log in
    - AJAX request to server to log in:
        - request URL: http://s-apis.learningfuze.com/todo/login
        - input (POST):
            - username
            - password
        - output:
            - success: true/false - whether or not the login was successful
            - status:  number - the status of the account (1 is normal user)
            - email: string - the user's email
            - lastName: string - the user's last name
            - firstName: string - the user's first name
            - id: number - the user's ID number
            - errors: array - an array of strings, each holding an error that occurred during the login
            - session_id: string - the new session ID for this user session
- LOGOUT:
    - add logout button
    - AJAX request to server to log out:
        - request URL: http://s-apis.learningfuze.com/todo/logout
        - input (POST):
            - username: string - the current user's username
            - **NEW AS OF 1.5** sid: string - the session id for the current user session.  Yes, sid.  Life sucks.
        - output:
            - success: true/false - whether or not the login was successful
            - msgs: string - logout message, if successful
            - errors: string: error that occurred during the logout
            - session_id: string - the current session ID for this user session

# TODO 1.5 (Group Project)
- tie in "create todo" frontend to backend
    - request URL: http://s-apis.learningfuze.com/todo/create
    - input (POST):
        - title: string - title of the todo post
        - dueDate: string - any valid date format as specified in the PHP strtotime specs
        - details: string - todo list details
        - userId: number - User's ID
    - output (JSON):
        - success: boolean - true or false
        - errors: array - array of error messages, if any
- tie in "list all todo items" frontend to backend
    - request URL: http://s-apis.learningfuze.com/todo/get
    - input (POST):
        - userId: number - User's ID to fetch todo items for
    - output (JSON):
        - data: array of objects
            - id: int - todo item ID
            - userID: int - todo item's owner
            - title: string - title of the todo item
            - timeStamp: int - unix timestamp of the duedate
            - details: string - details of the todo item
        - success: boolean - success or failure of the operation
        - errors: array - array of error messages, if any


# TODO 1.6 (Group Project)

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
