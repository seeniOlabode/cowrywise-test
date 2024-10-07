
<template>
  <RouterView />
</template>

<script setup>
import { RouterView } from 'vue-router';
import useNormalizedViewHeight from './composables/useNormalizedViewHeight';

useNormalizedViewHeight();
</script>
 

<style scoped>
</style>
