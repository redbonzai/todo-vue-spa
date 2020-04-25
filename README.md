# todo-vue-spa
> a project for evaluation by OnlineMedEd.  This is a Vue JS single page application that consumes Laravel API data
> This project consumes data from the [TODO Laravel API](https://github.com/redbonzai/todo-laravel7-api.git)
> It should be cloned and installed according to the documentation on that repository

## Features
- The user can create todos
- TODOS can be edited by simply clicking on a todo item and overriting it.  Pressing enter saves it to the database.
- The user can mark a todo item as complete
- The user can filter through their todo items ( all, complete, or active )
- The user can remove all the completed todos with a simple click 
- The user can mark all the todos as completed with a simple click. 
- State managed by Vuex

## Get project
```bash
git clone https://github.com/redbonzai/todo-vue-spa.git
cd ~/Projects/todo-vue-spa
(from wherever the project resides on your system)
```
## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

