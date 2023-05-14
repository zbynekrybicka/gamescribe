<template>
    <div>
      <template v-if="!id">
        <h1>Seznam cutscén</h1>
        <Table
          :data="cutscenes"
          @row-click="showCutscene"
          :headers="{ id: 'ID', name: 'Název', description: 'Popis' }"
        />
        <br />
        <button @click="addCutscene" class="btn btn-primary">Přidat cutscénu</button>
      </template>
      <CutSceneDetail :id="id" v-if="id" />
    </div>
  </template>
<script>
  import Table from "@/components/Table.vue";
  import CutSceneDetail from "@/components/CutSceneDetail.vue";
  
  export default {
    components: { Table, CutSceneDetail },
    computed: {
      cutscenes() {
        return this.$store.getters.cutScenes.map((x) => ({
          id: x.id,
          name: x.name,
          description: x.description,
        }));
      },
      id() {
        return this.$route.params.id;
      },
    },
    methods: {
      addCutscene() {
        this.$router.push("/cut-scenes/new");
      },
      showCutscene(id) {
        this.$router.push("/cut-scenes/" + id);
      },
    },
  };
  </script>