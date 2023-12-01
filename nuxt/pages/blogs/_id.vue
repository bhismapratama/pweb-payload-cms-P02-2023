<template>
  <div>
    <a href="/blogs">Back</a>
    <p v-if="blog === null">Fetching data on client...</p>
    <template v-else>
      <h3>{{ blog?.title || "" }}</h3>
      <p>{{ blog?.content || "" }}</p>
      <a :href="blog?.links" target="_blank">Link</a>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';  // Import useRoute from vue-router

const blog = ref(null);

onMounted(async () => {
  const route = useRoute();  // Use useRoute here
  console.log(route);

  try {
    const { data } = await axios.get(`http://localhost:3001/api/blogs/${route.params.id}`);
    blog.value = data.docs[0];
  } catch (error) {
    console.error('Error fetching data:', error);
    blog.value = {}; // Set an empty object or handle the error accordingly
  }
});
</script>
