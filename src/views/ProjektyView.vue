<template>
    <div>
      <h1>Projekty</h1>
      <Table :data="projects" @row-click="showProject" :headers="{id: 'ID', title: 'Název', description: 'Popis'}" />
      <br />
      <button @click="addProject" class="btn btn-primary">Přidat projekt</button>
    </div>
  </template>
<script>
  import Table from '@/components/Table.vue';
  
  export default {
    components: { Table },
    computed: {
      projects() {
        return this.$store.getters.projects;
      },
      id() {
        return this.$route.params.id;
      }
    },
    methods: {
      addProject() {
        this.$router.push('/projects/new');
      },
      showProject(id) {
        this.$router.push('/projects/' + id);
      }
    }
  };
</script>