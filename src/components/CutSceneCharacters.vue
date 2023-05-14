<template>
    <div>
      <h3>Postavy v cut-scéně</h3>
      <input v-model="search" placeholder="Vyhledat NPC" class="form-control" type="text" @keyup.enter="addNPC(filteredNPCs[0])"/>
  
      <ul class="list-group">
        <li class="list-group-item" v-for="npc in filteredNPCs" :key="npc.id">
          {{ npc.name }}
          <button class="btn btn-primary float-right" @click="addNPC(npc)">Přidat</button>
          
        </li>
      </ul>

      <hr>

      <ul class="list-group">
        <li class="list-group-item" v-for="npc in cutSceneNPCs" :key="npc.id">
            {{ npc.name }}
            <button class="btn btn-danger float-right" @click="removeNPC(npc)">Odebrat</button>
        </li>
      </ul>
      
    </div>
  </template>
  
  <script>
  export default {
    props: {
      cutScene: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        search: '',
      }
    },
    computed: {
      filteredNPCs() {
        if (this.search.length > 2) {
            return this.$store.getters.npcs.filter(npc => npc.name.toLowerCase().includes(this.search.toLowerCase()));
        } else {
            return []
        }
      },
      cutSceneNPCs() {
        return this.$store.getters.getCutSceneNPCs(this.cutScene);
      }
    },
    methods: {
      addNPC(npc) {
        if (npc) {
            this.$store.dispatch('addNPCtoCutScene', { cutSceneId: this.cutScene, npcId: npc.id });
            this.search = ''
        }
      },
      removeNPC(npc) {
        this.$store.dispatch('removeNPCfromCutScene', { cutSceneId: this.cutScene, npcId: npc.id });
      }
    },
  }
  </script>
  