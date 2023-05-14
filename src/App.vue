<template>
  <div>
    <div v-if="error" class="position-fixed bg-danger py-2 px-3">
      <h5 class="text-white">{{ error }}</h5>    
    </div>
    <Menu v-if="isLoggedIn" />
    <div class="container" v-if="isLoadedData">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Menu from '@/components/Menu.vue'

export default {
  name: 'App',
  components: {
    Menu,
  },
  computed: {
    ...mapGetters(['isLoggedIn', 'isLoadedData', 'error']),
  },
  created() {
    if (localStorage.getItem('gamescribe-authToken')) {
      this.$store.commit('setAuthToken', localStorage.getItem('gamescribe-authToken'))
      this.$store.dispatch('loadAll');
      if (localStorage.getItem('zvolenyProjekt')) {
        this.$store.commit('zvolitProjekt', localStorage.getItem('zvolenyProjekt'))
      }
    }
  }
}
</script>

<style>
</style>