<template>
  <v-app>
    <div>
      <navbar></navbar>
      <main class="py-4">
        <router-view></router-view>
      </main>
    </div>
  </v-app>
</template>

<script>
import navbar from "./components/Navbar";
export default {
  components: {
    navbar,
  },
};
</script>