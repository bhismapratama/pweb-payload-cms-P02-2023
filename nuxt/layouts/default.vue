<template>
    <div>
      <header>
        <h1>Nuxt Blog</h1>
        <nav>
          <nuxt-link to="/">Home</nuxt-link> |
          <nuxt-link to="/blogs">Get Blogs</nuxt-link> |
          <nuxt-link to="/about">About Us</nuxt-link>
        </nav>
      </header>
      <main>
        <nuxt />
      </main>
    </div>
  </template>
  
  <script>
  export default {
    // Your layout options
  };
  </script>
  
  <style>
  body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
  }
  
  header {
    background-color: #333;
    color: #fff;
    padding: 0.5rem;
    text-align: center;
  }
  
  nav {
    margin-top: 0.5rem;
    text-align: center;
  }
  
  nav a {
    color: #fff;
    margin-right: 0.5rem;
    text-decoration: none;
  }
  
  main {
    padding: 0.5rem;
  }
  </style>
  