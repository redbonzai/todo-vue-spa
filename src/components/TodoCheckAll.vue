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
    computed: {
      anyRemainingTodos() {
        return this.$store.getters.anyRemainingTodos
      }
    },

    methods: {
      allChecked() {
        this.$store.dispatch('checkAll', event.target.checked)
      }
    }
  }
</script>
