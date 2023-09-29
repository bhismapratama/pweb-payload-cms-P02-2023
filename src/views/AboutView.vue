<template>
    <div class="m-5 flex flex-col items-center justify-center gap-5">
      <div
        class="block p-6 lg:w-1/2 w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="text-white flex text-center flex-col gap-3">
          <h1 class="text-[32px]">ABOUT US</h1>
          <h3>Kelompok 1 pemrograman website </h3>
          <h4 class="font-bold">Halo</h4>
        </div>
      </div>  
    </div>
  </template>
  
  <script>
  
  export default {
    // template refs
    mounted() {
      console.log(this.$refs.asist);
    },
    data() {
      return {
        asist: [
          {
            name: "Wisnuyasha Faizal",
            nrp: 5027211036
          },
          {
            name: "Aloysius B. M.",
            nrp: 5027211008
          },
          {
            name: "Midyanisa Yuniar",
            nrp: 5027211025
          },
          {
            name: "Reynold Putra Merdeka",
            nrp: 5027211034
          },
          {
            name: "Rifqi Akhmad Maulana",
            nrp: 5027211035
          },
          {
            name: "Moh. Sulthan Arief Rahmatullah",
            nrp: 5027211045
          },
        ]
      }
    }
  };
  </script>
  