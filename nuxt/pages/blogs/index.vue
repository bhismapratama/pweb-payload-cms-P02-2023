<!-- pages/index.vue -->
<template>
  <div>
    <h1>Blog List</h1>
    <ul>
      <li v-for="blog in blogs" :key="blog.id">
        <nuxt-link :to="'/blogs/' + blog.id">{{ blog.title }}</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    try {
      const response = await $axios.get('/blogs');
      const titles = response.data.docs.map(blog => ({ id: blog.id, title: blog.title }));
      return { blogs: titles };
    } catch (error) {
      console.error('Error fetching data:', error);
      return { blogs: [] };
    }
  },
}
</script>
