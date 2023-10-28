
<template>
    <div>
      <ul>
        <li v-for="item in messages" :key="item.id">
          {{ item.name }}
          <button @click="editMessage(item)">Edit</button>
          <button @click="deleteMessage(item.id)">Delete</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    props: ['messages'],
    methods: {
      editMessage(item) {
        // Implement the edit functionality here.
      },
      deleteMessage(itemId) {
        // Implement the delete functionality here.
      },
    },
  };
  </script>
  
  <template>
    
    <div v-if="isEditing">
      <input v-model="editedMessage.name" />
      <button @click="saveEditedMessage">Save</button>
    </div>
  </template>
  
  <script>
  export default {
    
    data() {
      return {
        isEditing: false,
        editedMessage: {
          id: null,
          name: '',
        },
      };
    },
    methods: {
      editMessage(item) {
        this.isEditing = true;
        this.editedMessage.id = message.id;
        this.editedMessage.name = message.name;
      },
      saveEditedMessage() {
        
        this.isEditing = false;
      },
    },
  };
  </script>

<script>
export default {
  
  methods: {
    deleteMessage(messageId) {
      if (window.confirm('Are you sure you want to delete this message?')) {
        
      }
    },
  },
};
</script>

  