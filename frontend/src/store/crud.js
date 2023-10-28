import { reactive } from "vue";
import axios from "axios";

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

  async createTodo(todo) {
    try {
      const response = await axios.post("http://localhost:3000/api/todo/AddNotes", {
        title: todo.title,
        category: todo.category,
        status: todo.status
      });

      if (response.data === "pun saestu ditambah") {
        this.todos.push(todo);
        this.saveToLocalStorage();
      } else {
        console.error("Gagal menambahkan todo:", response.data);
      }
    } catch (error) {
      console.error("Error menambahkan todo:", error);
    }
  },

  async deleteTodo(todoId) {
    try {
      const response = await axios.delete(`http://localhost:3000/api/todo/DeleteNotes?id=${todoId}`);

      if (response.data === "terhapus mang") {
        const todoIndex = this.todos.findIndex((todo) => todo.id === todoId);

        if (todoIndex !== -1) {
          this.todos.splice(todoIndex, 1);
          this.saveToLocalStorage();
        }
      } else {
        console.error("Gagal menghapus todo:", response.data);
      }
    } catch (error) {
      console.error("Error menghapus todo:", error);
    }
  },

  async editTodo(updatedTodo) {
    try {
      const response = await axios.patch(`http://localhost:3000/api/todo/UpdateNotes/${updatedTodo.id}`, {
        title: updatedTodo.title,
        category: updatedTodo.category,
        status: updatedTodo.status
      });

      if (response.data === "pun update sedoyo") {
        const todoIndex = this.todos.findIndex((todo) => todo.id === updatedTodo.id);

        if (todoIndex !== -1) {
          this.todos.splice(todoIndex, 1, updatedTodo);
          this.saveToLocalStorage();
        }
      } else {
        console.error("Gagal mengedit todo:", response.data);
      }
    } catch (error) {
      console.error("Error mengedit todo:", error);
    }
  },

  saveToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }
});
