<template>
  <div>
    <Projekty v-if="isLoggedIn" />
    <Login v-if="!isLoggedIn" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Projekty from './ProjektyView.vue'
import Login from './LoginView.vue'

export default {
  name: 'App',
  components: {
    Projekty, Login
  },
  computed: {
    ...mapGetters(['isLoggedIn']),
  },
}
</script>