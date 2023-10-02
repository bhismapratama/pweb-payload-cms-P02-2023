import { reactive } from "vue";

export const todoStore = reactive({
  categories: [
    "Pendidikan",
    "Kesehatan",
    "Teknologi",
    "Olahraga",
    "Musik",
    "Seni dan Budaya",
    "Pariwisata",
    "Otomotif",
    "Mode dan Gaya Hidup",
    "Kuliner",
    "Alam dan Lingkungan",
    "Bisnis dan Keuangan",
    "Hiburan",
    "Sains",
    "Politik",
    "Hukum",
    "Desain",
    "Fotografi",
    "Keluarga dan Anak",
    "liburan"
  ],
  todos: [],
  createTodo(todo) {
    this.todos.push(todo);
  },
  deleteTodo(todoId) {
    const todoIndex = this.todos.findIndex((todo) => todo.id === todoId);
    console.log(todoIndex)
    if (todoIndex !== -1) {
      this.todos.splice(todoIndex, 1);
    }
  },
  editTodo(updatedTodo) {
    const todoIndex = todoStore.todos.findIndex((todo) => todo.id === updatedTodo.id);
    if (todoIndex !== -1) {
      todoStore.todos.splice(todoIndex, 1, updatedTodo);
    } else {
      todoStore.todos.splice(todoIndex, 1, updatedTodo);
    }
  }

});
