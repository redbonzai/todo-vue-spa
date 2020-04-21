<template>
  <div>

    <input
      type="text"
      class="todo-input"
      placeholder="What needs to get completed"
      v-model="newTodo"
      @keyup.enter="addTodo">

    <transition-group name="fade" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
        <todo-item
          v-for="todo in todosFiltered"
          :key="todo.id"
          :todo="todo"
          :checkAll="!anyRemainingTodos">
        </todo-item>

    </transition-group>

    <!-- Check all todos -->
    <div class="extra-container">
      <todo-check-all></todo-check-all>

    <!-- show remaining todos count -->
      <!-- :remaining="remaining" -->
      <todo-items-remaining></todo-items-remaining>
    </div>

    <!-- This is the filters section -->
    <div class="extra-container">
      <todo-filtered></todo-filtered>

      <transition name="fade">
        <todo-clear-completed></todo-clear-completed>
      </transition>

    </div>
  </div>
</template>

<script>
  import TodoItem from './TodoListItem'
  import TodoItemsRemaining from "./TodoItemsRemaining"
  import TodoCheckAll from "./TodoCheckAll"
  import TodoFiltered from "./TodoFiltered";
  import TodoClearCompleted from "./TodoClearCompleted";
  import moment from 'moment'

  export default {
    name: 'todo-list',
    components: {
      TodoClearCompleted,
      TodoFiltered,
      TodoItem,
      TodoItemsRemaining,
      TodoCheckAll
    },
    data() {
      return {
        // todoName: '',
        newTodo: '',
        idForTodo: 3,
        todoDescription: '',
      }
    },

    created() {
      this.$store.dispatch('retrieveTodos')
    },

    computed: {
      anyRemainingTodos() {
        return this.$store.getters.anyRemainingTodos
      },

      todosFiltered() {
        return this.$store.getters.todosFiltered
      },
    },

    methods: {
      addTodo() {
        if (this.newTodo.trim().length === 0) {
          return;
        }

        let futureDate = moment().add(1, 'week').format('YYYY-MM-DD')

        this.$store.dispatch('addTodo', {
          id: this.idForTodo,
          name: this.newTodo,
          description: this.newTodo,
          completed: Math.round(Math.random()), // 0 or 1
          target_date: futureDate

        })

        this.newTodo = ''
        this.idForTodo++
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  /* THis CDN is to animate the creation or removal of all todos */
  @import url('https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css');

  .todo-input {
    width: 100%;
    padding: 10px 18px;
    font-size: 18px;
    margin-bottom: 16px;
  }

  .todo-item {
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    animation-duration: 0.3s;
  }

  .remove-item {
    cursor: pointer;
    margin-left: 14px;
  }

  div.remove-item:hover {
    color: red;
  }

  .todo-item:hover, .todo-item-label:hover {
    outline: 0;
  }

  .todo-item-left {
    display: flex;
    align-items: center;
  }

  .todo-item-label {
    padding: 10px;
    border: 1px solid white;
    margin-left: 12px;
  }

  .todo-item-edit {
    font-size: 24px;
    color: #2c3e50;
    margin-left: 12px;
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
  }

  .completed {
    text-decoration: line-through;
    color: grey;
  }

  .extra-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    border-top: 1px solid lightgrey;
    padding-top: 14px;
    margin-bottom: 14px;
  }

  button {
    font-size: 14px;
    background-color: white;
    appearance: none;
  }

  button:hover {
    background: lightblue;
  }

  button:focus {
    outline: none;
  }

  .active {
    background: lightblue;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }


</style>
