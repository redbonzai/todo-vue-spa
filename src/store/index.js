import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    filer: 'all',
    todos: [{
      'id': 2,
      'name': 'Da Munchkin',
      'description': 'I love my munchkin',
      'completed': 0,
      'editing': false,
      'target_date': '2020-04-23'

    },
      {
        'id': 1,
        'name': 'the dang sample app',
        'description': 'vue spa laravel api',
        'completed': 0,
        'editing': false,
        'target_date': '2020-04-23'

      }]

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

      } else if (state.filter === 'active') {
        return state.todos.filter(todo => !todo.completed)

      } else if (state.filter === 'completed') {
        return state.todos.filter(todo => todo.completed)

      }

      return state.todos
    },

    showClearCompletedButton(state) {
      return state.todos.filter(todo => todo.completed).length > 0
    }
  }
})
