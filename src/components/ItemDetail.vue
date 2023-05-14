<template>
    <div>
      <div class="form-group">
        <label for="nameInput">Jméno:</label>
        <input v-model="item.name" type="text" class="form-control" id="nameInput">
      </div>
      <div class="form-group">
        <label for="descriptionTextarea">Popis:</label>
        <textarea v-model="item.description" class="form-control" id="descriptionTextarea"></textarea>
      </div>
      <button @click="handleSubmit" class="btn btn-primary">
        {{ id === 'new' ? 'Vytvořit' : 'Uložit' }}
      </button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ItemDetail',
    data() {
      return {
        item: {
          id: null,
          name: '',
          description: ''
        }
      }
    },
    methods: {
      save(id) {
        this.$store.dispatch('saveItem', {
          id,
          name: this.item.name,
          description: this.item.description
        })
      },
      create() {
        this.$store.dispatch('createItem', {
          name: this.item.name,
          description: this.item.description
        })
      },
      handleSubmit() {
        if (this.id === 'new') {
          this.create()
        } else {
          this.save(this.id)
        }
        this.$router.push('/items')
      }
    },
    computed: {
      locations() {
        return this.$store.getters.locations
      },
      id() {
        return this.$route.params.id !== 'new' ? parseInt(this.$route.params.id) : 'new'
      }
    },
    created() {
      if (this.id !== 'new') {
        const item = this.$store.getters.itemById(this.id)
        this.item.id = item.id
        this.item.name = item.name
        this.item.description = item.description
      }
    }
  }
  </script>
  
  <style scoped>
  .form-group label {
    font-weight: bold;
  }
  
  .form-control:focus {
    border-color: #80bdff;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.075),
      0 0 5px rgba(128, 189, 255, 0.5);
  }
  
  textarea {
    height: 100px;
    transition: height 0.3s ease-in-out;
  }
  
  textarea:focus {
    height: 500px;
  }
  </style>
  