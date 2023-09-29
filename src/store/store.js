import { reactive } from "vue";

export const userStore = reactive({
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
  users: [
    { id: 0, category: "Liburan", name: "jalan-jalan deh" },
  ],
  createUser(user) {
    this.users.push(user);
  },
  deleteUser(userId) {
    const userIndex = this.users.findIndex((user) => user.id === userId);
    console.log(userIndex)
    if (userIndex !== -1) {
      this.users.splice(userIndex, 1);
    }
  },
  editUser(updatedUser) {
    const userIndex = userStore.users.findIndex((user) => user.id === updatedUser.id);
    if (userIndex !== -1) {
      userStore.users.splice(userIndex, 1, updatedUser);
    } else {
      userStore.users.splice(userIndex + 1, 1, updatedUser);
    }
  }

});
