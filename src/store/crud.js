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
  todos: JSON.parse(localStorage.getItem('todos')) || [],
  createTodo(todo) {
    this.todos.push(todo);
    this.saveToLocalStorage();
  },
  deleteTodo(todoId) {
    const todoIndex = this.todos.findIndex((todo) => todo.id === todoId);
    if (todoIndex !== -1) {
      this.todos.splice(todoIndex, 1);
      this.saveToLocalStorage();
    }
  },
  editTodo(updatedTodo) {
    const todoIndex = this.todos.findIndex((todo) => todo.id === updatedTodo.id);
    if (todoIndex !== -1) {
      this.todos.splice(todoIndex, 1, updatedTodo);
      this.saveToLocalStorage();
    } else {
      this.todos.splice(todoIndex, 1, updatedTodo);
      this.saveToLocalStorage();
    }
  },
  saveToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }
});
