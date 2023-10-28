<template>
  <div>
    <main class="font-poppins">
      <HeaderTodo />
      <div class="flex items-center justify-between mb-8">
        <div class="flex justify-between items-center">
          <h1 class="font-bold text-slate-800 text-4xl py-2">TODO LIST APP</h1>
        </div>
        <div class="text-black font-medium text-md pt-1 text-right">
          {{ date }}
          <br />
          {{ time }}
        </div>
      </div>

      <section>
        <form @submit.prevent="addTask">
          <div>
            <button
              @click="showModal = true"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Add New Task
            </button>
            <div
              v-if="showModal"
              class="fixed inset-0 flex items-center justify-center z-50"
            >
              <div class="modal bg-white p-6 rounded-xl shadow-lg w-3/4">
                <h3 class="text-2xl font-semibold mb-3">Add New Task</h3>
                <div class="flex gap-2 mb-2">
                  <div class="w-full">
                    <h1 class="text-[24px] mb-4">Title</h1>
                    <input
                      type="text"
                      placeholder="Title"
                      v-model="content_input"
                      class="input-field px-5 py-3 bg-slate-300 text-black rounded-lg"
                    />
                  </div>
                  <div class="w-full">
                    <h1 class="text-[24px] mb-4">Category</h1>
                    <select
                      v-model="categoryName"
                      class="input-field px-5 py-3 bg-blue-500 text-white rounded-lg"
                    >
                      <option value="pendidikan">Pendidikan</option>
                      <option value="kesehatan">Kesehatan</option>
                      <option value="bisnis">Bisnis</option>
                      <option value="teknologi">Teknologi</option>
                      <option value="seni">Seni</option>
                      <option value="olahraga">Olahraga</option>
                      <option value="musik">Musik</option>
                      <option value="ilmu_komputer">Ilmu Komputer</option>
                      <option value="lingkungan">Lingkungan</option>
                      <option value="politik">Politik</option>
                      <option value="sosial">Sosial</option>
                      <option value="ekonomi">Ekonomi</option>
                      <option value="hukum">Hukum</option>
                      <option value="ilmu_pengetahuan">Ilmu Pengetahuan</option>
                      <option value="sejarah">Sejarah</option>
                      <option value="psikologi">Psikologi</option>
                      <option value="agama">Agama</option>
                      <option value="filsafat">Filsafat</option>
                      <option value="sains">Sains</option>
                      <option value="bahasa">Bahasa</option>
                    </select>
                  </div>
                  <div class="w-full">
                    <h1 class="text-[24px] mb-4">Status</h1>
                    <select
                      v-model="status"
                      class="input-field px-5 py-3 bg-purple-500 text-white rounded-lg"
                    >
                      <option value="not started">Not Started</option>
                      <option value="on progress">On Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                  <div class="flex gap-3">
                    <button
                      @click="addTask"
                      class="button-primary input-field p-3 bg-blue-500 text-white rounded-lg"
                    >
                      Add Todo
                    </button>
                    <button
                      @click="showModal = false"
                      class="button-secondary input-field p-3 bg-red-500 text-white rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>

      <section class="flex flex-col gap-4 mt-16">
        <div>
          <h2 class="font-semibold text-2xl mb-4">LIST TODO</h2>
          <div class="overflow-x-auto">
            <table class="min-w-full rounded-xl">
              <thead>
                <tr class="bg-gray-100">
                  <th class="p-3 text-center font-medium">Date</th>
                  <th class="p-3 text-center font-medium">Time</th>
                  <th class="p-3 text-center font-medium">Title</th>
                  <th class="p-3 text-center font-medium">Category</th>
                  <th class="p-3 text-center font-medium">Status</th>
                  <th class="p-3 text-center font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="filteredUnfinishedTodo.length === 0">
                  <td colspan="6" class="p-2 text-center font-medium">
                    belum ada tasks
                  </td>
                </tr>
                <tr v-for="task in filteredUnfinishedTodo" :key="task.id">
                  <td class="p-2 text-center">
                    {{ task.timestamp_date }}
                  </td>
                  <td class="p-2 text-center">
                    {{ task.timestamp_time }}
                  </td>
                  <td class="p-2 text-center">
                    <div v-if="!task.editing">{{ task.title }}</div>
                    <div v-else>
                      <input
                        v-model="task.title"
                        class="text-center rounded-xl p-2 w-full focus:ring-0 focus:border-transparent focus:outline-none"
                      />
                    </div>
                  </td>
                  <td class="p-2 text-center">
                    <div
                      v-if="!task.editing"
                      class="rounded-xl p-2 bg-purple-700 text-white"
                    >
                      {{ task.category }}
                    </div>
                    <div v-else>
                      <select
                        v-model="task.category"
                        class="rounded-xl p-2 bg-purple-700 text-white"
                      >
                        <option value="pendidikan">Pendidikan</option>
                        <option value="kesehatan">Kesehatan</option>
                        <option value="bisnis">Bisnis</option>
                        <option value="teknologi">Teknologi</option>
                        <option value="seni">Seni</option>
                        <option value="olahraga">Olahraga</option>
                        <option value="musik">Musik</option>
                        <option value="ilmu_komputer">Ilmu Komputer</option>
                        <option value="lingkungan">Lingkungan</option>
                        <option value="politik">Politik</option>
                        <option value="sosial">Sosial</option>
                        <option value="ekonomi">Ekonomi</option>
                        <option value="hukum">Hukum</option>
                        <option value="ilmu_pengetahuan">
                          Ilmu Pengetahuan
                        </option>
                        <option value="sejarah">Sejarah</option>
                        <option value="psikologi">Psikologi</option>
                        <option value="agama">Agama</option>
                        <option value="filsafat">Filsafat</option>
                        <option value="sains">Sains</option>
                        <option value="bahasa">Bahasa</option>
                      </select>
                    </div>
                  </td>
                  <td class="p-2 text-center">
                    <div
                      v-if="!task.editing"
                      class="rounded-xl p-2 bg-green-700 text-white"
                    >
                      {{ task.status }}
                    </div>
                    <div v-else>
                      <select
                        v-model="task.status"
                        class="rounded-xl p-2 bg-green-700 text-white"
                      >
                        <option value="not started">Not Started</option>
                        <option value="on progress">On Progress</option>
                      </select>
                    </div>
                  </td>
                  <td class="p-2 text-center">
                    <button
                      v-if="!task.editing"
                      @click="tandaiSebagaiSelesai(task)"
                      class="button-primary mr-2 px-3 py-2 rounded-xl bg-green-700 hover:bg-green-900 text-white"
                    >
                      Done
                    </button>
                    <button
                      @click="removeTask(task._id)"
                      class="mr-2 button-danger font-medium px-3 py-2 rounded-xl bg-red-500 hover:bg-red-700 text-white"
                    >
                      Hapus
                    </button>
                    <button
                      @click="task.editing ? saveTask(task) : editTask(task)"
                      class="button-primary text-white font-medium text-lg px-3 py-2 rounded-xl bg-blue-500 hover:bg-blue-700 transition-all"
                    >
                      {{ task.editing ? "Save" : "Edit" }}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section class="flex flex-col gap-5 mt-16">
        <div>
          <h2 class="font-semibold text-2xl mb-4">COMPLETED TODO</h2>
          <div class="overflow-x-auto">
            <table class="min-w-full border border-gray-300 rounded-xl">
              <thead>
                <tr class="bg-gray-100">
                  <th
                    class="border border-gray-300 p-3 text-center font-medium"
                  >
                    Date
                  </th>
                  <th
                    class="border border-gray-300 p-3 text-center font-medium"
                  >
                    Time
                  </th>
                  <th
                    class="border border-gray-300 p-3 text-center font-medium"
                  >
                    Title
                  </th>
                  <th
                    class="border border-gray-300 p-3 text-center font-medium"
                  >
                    Category
                  </th>
                  <th
                    class="border border-gray-300 p-3 text-center font-medium"
                  >
                    Status
                  </th>
                  <th
                    class="border border-gray-300 p-3 text-center font-medium"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="completedTodo.length === 0">
                  <td
                    colspan="6"
                    class="border border-gray-300 p-3 text-center font-medium text-gray-600"
                  >
                    belum ada todo completed
                  </td>
                </tr>
                <tr v-for="task in completedTodo" :key="task.id">
                  <td class="border border-gray-300 p-3 text-center">
                    {{ task.timestamp_date }}
                  </td>
                  <td class="border border-gray-300 p-3 text-center">
                    {{ task.timestamp_time }}
                  </td>
                  <td class="border border-gray-300 p-3 text-center">
                    {{ task.title }}
                  </td>
                  <td class="border border-gray-300 p-3 text-center">
                    {{ task.category }}
                  </td>
                  <td
                    class="border border-gray-300 p-3 text-center bg-green-500 text-white"
                  >
                    {{ task.status }}
                  </td>
                  <td class="border border-gray-300 p-3 text-center">
                    <button
                      class="text-white font-medium text-lg px-3 py-2 rounded-xl bg-red-500 hover:bg-red-600 transition-all"
                      @click="removeCompletedTask(task._id)"
                    >
                      hapus
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import api from "../api/api";

export default {
  data() {
    return {
      showModal: false,
      name: "",
      date: "",
      time: "",
      week: ["Sun", "Mon", "Tues", "Wed", "Thurs", "Frid", "Sat"],
      content_input: "",
      categoryName: "pendidikan",
      status: "not started",
      todo: [],
    };
  },
  computed: {
    filteredUnfinishedTodo() {
      return this.todo.filter((task) => task.status !== "completed");
    },
    completedTodo() {
      return this.todo.filter((task) => task.status === "completed");
    },
  },
  methods: {
    async fetchDataFromBackend() {
      try {
        const todoList = await api.getTodoList();
        this.todo = todoList;
      } catch (error) {
        console.error("Failed to fetch todo list:", error);
      }
    },

    async addTask() {
      if (this.content_input.trim() === "") {
        return;
      }

      const newTaskData = {
        title: this.content_input,
        category: this.categoryName,
        status: this.status,
      };

      try {
        const response = await api.addTask(newTaskData);
        if (response) {
          const current_date = new Date();
          const timestamp_date = current_date.toDateString();

          const timestamp_time =
            this.zeroPadding(current_date.getHours(), 2) +
            ":" +
            this.zeroPadding(current_date.getMinutes(), 2) +
            ":" +
            this.zeroPadding(current_date.getSeconds(), 2);

          const newTask = {
            title: this.content_input,
            category: this.categoryName,
            status: this.status,
            timestamp_date: timestamp_date,
            timestamp_time: timestamp_time,
          };

          this.todo.push(newTask);

          if (this.status === "not started" || this.status === "on progress") {
            this.filteredUnfinishedTodo.push(newTask);
          }

          this.content_input = "";
          window.location.reload();
        }
      } catch (error) {
        console.error("Failed to add task:", error);
      }
    },
    async removeTask(id) {
      try {
        await api.deleteTask(id);
        const taskIndex = this.todo.findIndex((task) => task.id === id);

        if (taskIndex !== -1) {
          this.todo.splice(taskIndex, 1);
          this.filteredUnfinishedTodo = this.filteredUnfinishedTodo.filter(
            (task) => task.id !== id
          );
        }
        window.location.reload();
      } catch (error) {
        console.error("Failed to remove task:", error);
      }
    },

    async removeCompletedTask(taskId) {
      try {
        await api.deleteTask(taskId);
        const taskIndex = this.completedTodo.findIndex(
          (task) => task.id === taskId
        );

        if (taskIndex !== -1) {
          this.completedTodo.splice(taskIndex, 1);
        }
        window.location.reload();
      } catch (error) {
        console.error("Failed to remove completed task:", error);
      }
    },

    editTask(task) {
      task.editing = true;
      task.backupTitle = task.title;
      task.backupCategory = task.category;
      task.backupStatus = task.status;
    },

    async saveTask(task) {
      task.editing = false;
      try {
        const current_date = new Date();
        const timestamp_date = current_date.toDateString();

        const timestamp_time =
          this.zeroPadding(current_date.getHours(), 2) +
          ":" +
          this.zeroPadding(current_date.getMinutes(), 2) +
          ":" +
          this.zeroPadding(current_date.getSeconds(), 2);

        const updatedData = {
          title: task.title,
          category: task.category,
          status: task.status,
          timestamp_date: timestamp_date,
          timestamp_time: timestamp_time,
        };

        await api.updateTask(task._id, updatedData);
        window.location.reload();
      } catch (error) {
        console.error("Gagal menyimpan tugas:", error);
      }
    },

    async tandaiSebagaiSelesai(task) {
      try {
        task.status = "completed";
        await api.updateTask(task._id, {
          title: task.title,
          category: task.category,
          status: task.status,
          status: "completed",
        });
      } catch (error) {
        console.error("Gagal menandai tugas sebagai selesai:", error);
      }
    },

    updateTime() {
      const current_date = new Date();
      this.date =
        this.week[current_date.getDay()] +
        ", " +
        this.zeroPadding(current_date.getDate(), 2) +
        " - " +
        this.zeroPadding(current_date.getMonth() + 1, 2) +
        " - " +
        this.zeroPadding(current_date.getFullYear(), 4);

      this.time =
        this.zeroPadding(current_date.getHours(), 2) +
        ":" +
        this.zeroPadding(current_date.getMinutes(), 2) +
        ":" +
        this.zeroPadding(current_date.getSeconds(), 2);
    },
    zeroPadding(num, digit) {
      let zero = "";
      for (let i = 0; i < digit; i++) {
        zero += "0";
      }
      return (zero + num).slice(-digit);
    },
  },
  mounted() {
    this.updateTime();
    this.fetchDataFromBackend();
  },
};
</script>
