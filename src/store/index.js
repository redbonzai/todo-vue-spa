import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
axios.defaults.baseURL = 'http://127.0.0.1:8000/api/'

export const store = new Vuex.Store({
  state: {
    filter: 'all',
    todos: [
    //   {
    //   'id': 2,
    //   'name': 'Da Munchkin',
    //   'description': 'I love my munchkin',
    //   'completed': 0,
    //   'editing': false,
    //   'target_date': '2020-04-23'
    //
    // },
    ]

  },

  getters: {
    remaining(state) {
      return state.todos.filter(todo => !todo.completed).length
    },

    anyRemainingTodos(state, getters) {
      return getters.remaining !== 0
    },

    todosFiltered(state) {
     if (state.filter === 'all') {

        return state.todos

     }else if (state.filter === 'active') {
        return state.todos.filter(todo => !todo.completed)

      } else if (state.filter === 'completed') {
        return state.todos.filter(todo => todo.completed)

      }

      return state.todos
    },

    showClearCompletedButton(state) {
      return state.todos.filter(todo => todo.completed).length > 0
    }
  },

  mutations: {
    retrieveTodos(state, todos) {
      state.todos = todos
    },

    addTodo(state, todo) {
      state.todos.push({
        id: todo.id,
        name: todo.name,
        description: todo.description,
        completed: todo.completed,
       // editing: todo.editing,
        target_date: todo.target_date
      })
    },

    updateTodo(state, todo) {
      const index = state.todos.findIndex(item => item.id === todo.id)
      state.todos.splice(index, 1, {
        'id': todo.id,
        'name': todo.name,
        'description': todo.description,
        'completed': todo.completed,
        'targetDate': todo.targetDate,
        'editing': todo.editing,
      })
    },

    deleteTodo(state, id) {
      const index = state.todos.findIndex(item => item.id === id)
      state.todos.splice(index, 1)
    },

    clearCompleted(state) {
      state.todos = state.todos.filter(todo => !todo.completed)
    },

    changeFilter(state, filter) {
      state.filter = filter
    },

    checkAll(state, checked) {
      state.todos.forEach(todo => todo.completed = checked)
    }
  },

  actions: {
    retrieveTodos(context) {
      axios.get('todos')
        .then(response => context.commit('retrieveTodos', response.data['tasks']))
    },

    addTodo(context, todo) {
      axios.post('todos', todo)
        .then(response => context.commit('addTodo', response.data.original.data))

    },

    updateTodo(context, todo) {
      axios.put('todos/' + todo.id, {
        name: todo.name,
        description: todo.description,
        completed: todo.completed,
        target_date: todo.targetDate
      })
        .then(response => context.commit('updateTodo', response.data.original.data))
    },

    deleteTodo(context, id) {
      axios.delete('todos/' + id)
        .then(response => context.commit('deleteTodo', response.data.original.destroyed.id))

    },

    checkAll(context, checked) {
      axios.put('todos/update/completed', {
        completed: checked
      }).then(() => context.commit('checkAll', checked))

    },

    clearCompleted(context) {
      const completed = store.state.todos
        .filter(item => item.completed)
        .map(todo => todo.id)
      axios.delete('todos/destroy/complete', {
        data: {
          todos: completed
        }
      }).then(response => {
        context.commit('clearCompleted')
      } )

    },

    changeFilter(context, filter) {
      context.commit('changeFilter', filter)
    }
  }
})
