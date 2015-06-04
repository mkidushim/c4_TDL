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
        - request URL: http://learningfuze.com/todo/login
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
