<script>
import Modal from "../components/Modal.vue";
import TodoList from "../components/TodoList.vue";
import AddTodo from "../components/AddTodo.vue";
import HeaderTodo from "../components/HeaderTodo.vue";

export default {
  components: {
    Modal,
    TodoList,
    AddTodo,
    HeaderTodo,
  },
};
</script>

<template>
  <main class="min-h-full w-full flex flex-col justify-center p-8">
    <div class="w-full h-fit justify justify-center flex flex-col mt-3 px-56">
      <HeaderTodo />
      <TodoList />
    </div>
  </main>
</template>
