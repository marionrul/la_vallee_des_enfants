<template>
  <v-toolbar app fixed tabs clipped-left light dense color="blue-grey lighten-5">
    <v-tabs icons-and-text fixed-tabs slot="extension" light color="blue-grey lighten-5" >
      <v-tabs-slider color="blue"></v-tabs-slider>
      <v-tab to="/" >
        <h4 class="purple--text">Accueil</h4>
        <v-icon x-large color="purple">home</v-icon>
      </v-tab>
      <v-tab v-bind:to="'/contrat/employeur/' + $store.state.employeur.id">
          <h4 class="orange--text">Contrats</h4>
          <v-icon x-large color="orange">attach_file</v-icon>
      </v-tab>
      <v-tab to="/actualites" class="d-inline-block" ripple>
        <h4 class="blue--text"> Fil d'actualité </h4>
        <v-icon x-large color="blue">event</v-icon>
      </v-tab>
      <v-tab to="/contact" class="d-inline-block" ripple>
        <h4 class="red--text text--lighten-3"> Contact </h4>
        <v-icon x-large color="red lighten-3">mail_outline</v-icon>
      </v-tab>
      <v-menu offset-y open-on-hover transition="scale-transition"  class="tabs__div">
        <a class="tabs__item" slot="activator" >
          <h4 class="teal--text">Compte</h4>
          <v-icon x-large color="teal">account_circle</v-icon>
        </a>
        <v-list class="grey lighten-3" >
          <v-list-tile avatar to="/employeur/parametres" >
            <v-list-tile-avatar>
              <v-icon medium class="transparent grey--text">settings</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>Paramètres</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile avatar  to="/">
            <v-list-tile-avatar>
              <v-icon medium>exit_to_app</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content @click="logout">
              <v-list-tile-title>Deconnexion</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-tabs>
  </v-toolbar>
</template>

<script>
export default {
  name: 'ToolbarEmployeur',
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('removeEmployeur')
      this.$notify({
        group: 'employeur',
        title: 'Déconnexion',
        text: 'Vous venez de vous déconnecter',
        duration: 4000,
        speed: 500,
        type: 'warn'
      })
      this.$router.push({
        name: 'Accueil'
      })
    }
  }

}
</script>

<style scoped>

</style>
