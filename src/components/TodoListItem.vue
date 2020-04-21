<template>
  <div class="todo-item">
    <div class="todo-item-left">
      <input
        type="checkbox"
        v-model="completed"
        @change="doneEditing">
      <div
        v-if="!editing"
        @dblclick="editTodo"
        class="todo-item-label"
        :class="{completed: completed}">
        {{name}}
      </div>

      <input
        v-else
        class="todo-item-edit"
        type="text"
        v-model="name"
        @blur="doneEditing"
        @keyup.enter="doneEditing"
        @keyup.esc="cancelEdit"
        v-focus>
    </div>
    <div class="remove-item" @click="removeTodo(todo.id)">&times;</div>
  </div>
</template>

<script>
  import moment from 'moment'
  export default {
    name: 'todo-item',
    props: {
      todo: {
        type: Object,
        required: true,
      },
      checkAll: {
        type: Boolean,
        required: true,
      }
    },

    data() {
      return {
        'id': this.todo.id,
        'name': this.todo.name,
        'completed': this.todo.completed,
        'editing': this.todo.editing,
        'beforeEditCache': ''
      }
    },

    directives: {
      focus: {
        inserted: function (el) {
          el.focus()
        }
      }
    },

    watch: {
      checkAll() {
        this.completed = this.checkAll
          ? true
          : this.todo.completed
      }
    },
    methods: {
      removeTodo(id) {
        this.$store.dispatch('deleteTodo', id)
      },

      editTodo() {
        this.beforeEditCache = this.name
        this.editing = true
      },

      doneEditing() {
        if (this.name.trim() === '') {
          this.name = this.beforeEditCache
        }

        this.editing = false

        let futureDate = moment().add(1, 'week').format('YYYY-MM-DD')
        this.$store.dispatch('updateTodo', {
          'id': this.id,
          'name': this.name,
          'description': 'Will be finalized on: ' + futureDate,
          'completed': this.completed,
          'targetDate': futureDate,
          'editing': this.editing,
        })

      },

      cancelEdit() {
        this.name = this.beforeEditCache
        this.editing = false
      },
    }
  }
</script>
