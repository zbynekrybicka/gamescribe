<template>
    <div>
        <div class="form-group">
          <label for="titleInput">Název projektu:</label>
          <input v-model="title" type="text" class="form-control" id="titleInput">
        </div>
        <div class="form-group">
          <label for="descriptionTextarea">Popis projektu:</label>
          <textarea v-model="description" @focus="isFocused = true" @blur="isFocused = false" class="form-control" :class="textareaClasses" id="descriptionTextarea"></textarea>
        </div>
        <button @click="handleSubmit" class="btn btn-primary">{{ id === 'new' ? 'Vytvořit' : 'Uložit' }}</button>

        <button @click="zvolitProjekt" class="btn btn-info" v-if="id !== 'new'">Zvolit projekt</button>
    </div>
  </template>
  <style scoped>
  
    .form-group label {
      font-weight: bold;
    }
  
    .form-control:focus {
      border-color: #80bdff;
      box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.075), 0 0 5px rgba(128, 189, 255, 0.5);
    }
  
    textarea {
      height: 100px;
      transition: height 0.3s ease-in-out;
    }
  
    textarea.focus {
      height: 500px;
    }
  </style>
  <script>
  export default {
    name: 'ProjectDetail',
    data() {
      return {
        title: '',
        description: '',
        isFocused: false,
        interval: null,
      }
    },
    mounted() {
      if (this.id !== 'new') {
        const project = this.$store.state.data.projects.find(x => x.id == this.id)
        this.title = project.title
        this.description = project.description
        this.interval = setInterval(this.save, 30000)
      }
    },
    methods: {
      save() {
        this.$store.dispatch('saveProject', {
          id: this.id,
          title: this.title,
          description: this.description
        })
      },
      create() {
        this.$store.dispatch('createProject', {
          title: this.title,
          description: this.description
        })
      },
      handleSubmit() {
        if (this.id === 'new') {
          this.create()
        } else {
          this.save()
        }
        this.$router.push('/')
      },
      zvolitProjekt() {
        this.$store.commit("zvolitProjekt", this.id)
      }
    },
    computed: {
        id() {
            return this.$route.params.id
        },
      textareaClasses() {
        return this.isFocused ? 'focus' : ''
      }
    },
    beforeUnmount() {
        if (this.interval) {
            clearInterval(this.interval)
        }
    }
  }
  </script>