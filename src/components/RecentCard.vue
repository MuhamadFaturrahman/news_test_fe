<!-- eslint-disable vue/no-parsing-error -->

<template>
    <v-col cols="12" md="4">
      <v-card v-if="recent" @click="handleClick" class="news-card">
        <v-img :src="recent.imageUrl" :style="{ height: '150px' }"></v-img>
        <v-card-title class="headline">{{ recent.title }}</v-card-title>
      </v-card>
    </v-col>
  </template>
  
  <script>
  export default {
    props: {
      recent: {
        type: Object,
        default: null
      }
    },
    methods: {
      handleClick() {
        window.open(this.recent.newsUrl, '_blank');
      }
    }
  }
  </script>
  