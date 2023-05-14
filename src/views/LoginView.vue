<template>
    <div class="container">
      <div class="row">
        <div class="col-sm-8 col-md-6 mx-auto">
          <h1 class="my-4 text-center">Přihlášení</h1>
          <form class="my-4">
            <div class="form-group">
              <label for="email">E-mail</label>
              <input type="email" class="form-control" id="email" v-model="email" required>
            </div>
            <div class="form-group">
              <label for="password">Heslo</label>
              <input type="password" class="form-control" id="password" v-model="password" required>
            </div>
            <div class="form-group form-check">
              <input type="checkbox" class="form-check-input" id="remember-me" v-model="rememberMe">
              <label class="form-check-label" for="remember-me">Zapamatovat si mě</label>
            </div>
            <button type="submit" class="btn btn-primary" @click.prevent="login()">Přihlásit se</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  
  <script>
  export default {
    name: "Login",
    data() {
      return {
        email: "",
        password: "",
        rememberMe: false
      };
    },
    methods: {
      login() {
        this.$store.dispatch('login', { email: this.email, password: this.password, rememberMe: this.rememberMe })
      },
    },
  };
  </script>
  