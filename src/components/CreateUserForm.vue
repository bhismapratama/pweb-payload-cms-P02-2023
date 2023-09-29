<script>
import { userStore } from "../store/store.js";

let today = new Date(); 
let date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear() + '.';
let dateTime = date;

export default {
  emits: ["close-modal"],
  data() {
    return {
      userStore,
      inputTitle: "",
      inputCategory: "",
    };
  },
  methods: {
    addUser() {
      if (
        this.inputCategory === "" ||
        this.inputTitle === "" 
      )
        return;
      const newUser = {
        id: Date.now(),
        category: this.inputCategory,
        title: this.inputTitle,
        date: dateTime,
      };
      userStore.createUser(newUser);
      this.inputCategory = "";
      this.inputTitle = "";
      this.$emit("close-modal");
    },
  },
};
</script>

<template>
  <span class="text-gray-700 font-bold text-2xl">TODO LIST APP</span>
  <div class="flex flex-col gap-3">
    <div class="flex flex-col gap-1">
      <label class="text-gray-700 font-semibold">Category</label>
      <select v-model="inputCategory" class="border-2 py-1 border-gray-400 rounded-md">
        <option v-for="category in userStore.categories" :key="category" :value="category">{{ category }}</option>
      </select>
    </div>
  </div>
  <div class="flex flex-col gap-1">
      <label class="text-gray-700 font-semibold">Title</label>
      <input
        v-model="inputTitle"
        class="border-2 py-1 px-2 border-gray-400 rounded-md"
      />
    </div>
  <button
    @click="addUser"
    class="px-4 py-2 mt-1 bg-gray-700 w-fit h-fit text-gray-100 font-bold text-sm rounded-xl hover:scale-110 transition-all hover:ease-in-out hover:duration-300"
  >
    Create
  </button>
</template>
