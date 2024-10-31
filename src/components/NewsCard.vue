<!-- eslint-disable vue/no-parsing-error -->
 
<template>
    <v-col :cols="cols" :md="md" >
    <v-card v-if="article"
    @click="handleClick" class="news-card">
      <v-img :src="article.imageUrl" :style="{ height: height + 'px' }"></v-img>
      <v-card-title class="headline">{{ article.title }}</v-card-title>
      <v-card-subtitle>{{ article.author }}</v-card-subtitle>
      <v-card-text>{{ formatDate(article.date) }} | {{ article.name }}</v-card-text>
      <v-card-text>{{ article.newsDesc}}</v-card-text>
    </v-card>
    <v-skeleton-loader v-else type="card" height="150px" />
  </v-col>

</template>
  
  <script>
  export default {
  props: {
    article: {
      type: Object,
      default: null
    },
    cols: {
      type: Number,
      default: 12
    },
    md: {
      type: Number,
      default: 4
    },
    height: {
        type: Number,
        default: 150
    }
  },
 methods: {
    handleClick() {
      this.$emit('viewed', this.article);
      window.open(this.article.newsUrl, '_blank');
      console.log()
    },
    formatDate(date) {
        const options = { weekday: 'short', day: '2-digit', month: 'long', year: 'numeric' };
        return new Intl.DateTimeFormat('id-ID', options).format(new Date(date));
    }
  }
}
  </script>
  

  