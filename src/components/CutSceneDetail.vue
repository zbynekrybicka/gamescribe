<template>
    <div>
      <div class="form-group">
        <label for="nameInput">Jméno:</label>
        <input v-model="cutscene.name" type="text" class="form-control" id="nameInput">
      </div>
      <div class="form-group">
            <label for="locationInput">Lokace:</label>
            <select v-model="cutscene.location_id" class="form-control" id="locationInput">
                <option v-for="location in locations" :value="location.id">{{ location.name }}</option>
            </select>
        </div>
      <div class="form-group">
        <label for="descriptionTextarea">Popis:</label>
        <textarea v-model="cutscene.description" class="form-control" id="descriptionTextarea"></textarea>
      </div>
      <button @click="handleSubmit" class="btn btn-primary">
        {{ id === 'new' ? 'Vytvořit' : 'Uložit' }}
      </button>

      <CutSceneCharacters :cut-scene="id" v-if="id !== 'new'"/>
      <CutSceneDialogs :npcs="cutSceneNPCs" :cut-scene="id" v-if="id !== 'new'" />
    </div>
  </template>
  
  <script>
import CutSceneCharacters from '@/components/CutSceneCharacters.vue'
import CutSceneDialogs from '@/components/CutSceneDialogs.vue'

  export default {
    name: 'CutSceneDetail',
    components: { CutSceneCharacters, CutSceneDialogs },
    data() {
      return {
        cutscene: {
          id: null,
          name: '',
          description: '',
          location_id: 1
        }
      }
    },
    methods: {
      save(id) {
        this.$store.dispatch('saveCutScene', {
          id,
          name: this.cutscene.name,
          description: this.cutscene.description,
          location_id: this.cutscene.location_id,
        })
      },
      create() {
        this.$store.dispatch('createCutScene', {
          name: this.cutscene.name,
          description: this.cutscene.description,
          location_id: this.cutscene.location_id,
        })
      },
      handleSubmit() {
        if (this.id === 'new') {
          this.create()
        } else {
          this.save(this.id)
        }
        this.$router.push('/cut-scenes')
      }
    },
    computed: {
      locations() {
        return this.$store.getters.locations.map(x => ({
            id: x.id,
            name: this.$store.getters.deepLocationById(x.id)
        }))
      },
      id() {
        return this.$route.params.id !== 'new' ? parseInt(this.$route.params.id) : 'new'
      },
      cutSceneNPCs() {
        return this.$store.getters.getCutSceneNPCs(this.id);
      }
    },
    created() {
      if (this.id !== 'new') {
        const cutscene = this.$store.getters.cutsceneById(this.id)
        this.cutscene.id = cutscene.id
        this.cutscene.name = cutscene.name
        this.cutscene.description = cutscene.description
        this.cutscene.location_id = this.cutscene.location_id
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
  