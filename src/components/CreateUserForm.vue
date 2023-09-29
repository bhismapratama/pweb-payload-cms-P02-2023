<script>
import { userStore } from "../store/store.js";

export default {
  emits: ["close-modal"],
  data() {
    return {
      userStore,
      inputName: "",
      inputCategory: "",
    };
  },
  methods: {
    addUser() {
      if (
        this.inputCategory === "" ||
        this.inputName === "" 
      )
        return;
      const newUser = {
        id: Date.now(),
        category: this.inputCategory,
        name: this.inputName,
        date: Date.now(),
      };
      userStore.createUser(newUser);
      this.inputCategory = "";
      this.inputName = "";
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
        v-model="inputName"
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
