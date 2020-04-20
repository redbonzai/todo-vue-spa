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
    <div class="remove-item" @click="removeTodo(index)">&times;</div>
  </div>
</template>

<script>
  export default {
    name: 'todo-item',
    props: {
      todo: {
        type: Object,
        required: true,
      },
      index: {
        type: Number,
        required: true
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
      removeTodo(index) {
        eventBus.$emit('removedTodo', index)
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
        eventBus.$emit('finishedEdit', {
          'index': this.index,
          'todo': {
            'id': this.id,
            'name': this.name,
            'completed': this.completed,
            'editing': this.editing,
          }
        })
      },

      cancelEdit() {
        this.name = this.beforeEditCache
        this.editing = false
      },
    }
  }
</script>
