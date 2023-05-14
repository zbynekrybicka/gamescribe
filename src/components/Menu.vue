<template>
    <div class="menu">
      
      
      <nav class="navbar navbar-expand-md navbar-dark bg-dark">
        <a class="navbar-brand" href="#">Gamescribe</a>
      
        <div class="collapse navbar-collapse show" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <router-link to="/" class="nav-link">Projekty</router-link>
            </li>
            <template v-if="jeZvolenyProjekt">
            <li class="nav-item">
              <router-link to="/locations" class="nav-link">Lokace</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/npc" class="nav-link">NPC postavy</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/items" class="nav-link">Předměty</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/cut-scenes" class="nav-link">Cut-scény</router-link>
            </li>
          </template>
            <li class="nav-item">
              <a href="#" class="nav-link logout" @click.prevent="logout()">Odhlásit se</a>
            </li>
          
          </ul>
        </div>
      </nav>

      
    </div>
  </template>
  
  <style scoped>
  .menu {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #333;
    color: #fff;
    padding: 10px;
  }
  
  .menu a {
    color: #fff;
    text-decoration: none;
    margin-right: 10px;
  }
  
  .menu a:hover {
    text-decoration: underline;
  }
  
  .logout {
    margin-left: auto;
    font-weight: bold;
    cursor: pointer;
  }
  
  .logout:hover {
    text-decoration: underline;
  }
  </style>
  
  <script>
  export default {
    name: 'Menu',
    methods: {
        logout() {
            this.$store.commit("logout")
        }
    },
    computed: {
      jeZvolenyProjekt() {
        return this.$store.getters.jeZvolenyProjekt
      }
    }
  }
  </script>
  