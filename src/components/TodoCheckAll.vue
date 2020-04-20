<template>
  <div>
    <label>
      <input
        type="checkbox"
        :checked="!anyRemainingTodos"
        @change="allChecked"/>

      Check All Todos
    </label>
  </div>
</template>

<script>
  export default {
    name: 'todo-check-all',
    props: {
      anyRemainingTodos: {
        type: Boolean,
        required: true
      }
    },

    methods: {
      allChecked() {
        eventBus.$emit('checkAllChanged', this.anyRemainingTodos)
      }
    }
  }
</script>
