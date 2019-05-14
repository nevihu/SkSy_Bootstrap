# SkSy_Bootstrap
A small webapp for a todo list.

##Dependencies
- [node.js](https://nodejs.org/en/download/)
- [mongodb](https://docs.mongodb.com/manual/installation/)


## 1. Start MongoDB

If you installed mongodb via homebrew use:
```
brew services start mongodb
```

If you use windows go to the folder where you installed MongoDB and type:
```
mongod
```

## 2. Start the app

Go to the root folder of this project and type in:
```
node app.js
``` 

# Usage

Go to the overview site via [http://localhost:8080/todo-overview.html](http://localhost:8080/todo-overview.html) there you see a table with all current todos.

If you want to add a todo, all you have to do is type your desired task into the input fields and press on the button on the right to it.

In case you want to edit one given todo or delete it, just press the button with the pen or trash icon and you're good to go :-)