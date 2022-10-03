<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/feed/best">Best</RouterLink> |
        <RouterLink to="/feed/new">New</RouterLink> |
        <RouterLink to="/feed/subs">Subs</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped></style>
