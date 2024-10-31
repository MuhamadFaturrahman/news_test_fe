<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <AppHeader/>
  <TopSection/>
  <v-container>
    <v-tabs
      v-model="tab"
      align-tabs="center"
      color="blue"
    >
      <v-tab value="feeds">News Feed</v-tab>
      <v-tab value="recent">Recently Viewed</v-tab>
    </v-tabs>

    <v-tabs-window v-model="tab">
      <!-- News Feed Tab -->
      <v-tabs-window-item value="feeds">
        <v-container>
          <v-row>
            <NewsCard :article="articles[0]" :cols="10" :md="6" :height="300" @viewed="addToRecentlyViewed"/>
            <v-col cols="12" md="6">
              <v-row>
                <NewsCard
                  v-for="(article, index) in articles.slice(1, 5)"
                  :key="index"
                  :article="article"
                  :cols="12"
                  :md="6"
                  @viewed="addToRecentlyViewed"
                />
              </v-row>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <v-row>
                <NewsCard
                  v-for="(article, index) in articles.slice(6, 10)"
                  :key="index"
                  :article="article"
                  :cols="12"
                  :md="6"
                  @viewed="addToRecentlyViewed"
                />
              </v-row>
            </v-col>
            <NewsCard :article="articles[11]" :cols="10" :md="6" :height="300" @viewed="addToRecentlyViewed"/>
          </v-row>
        </v-container>
      </v-tabs-window-item>

      <!-- Recently Viewed Tab -->
      <v-tabs-window-item value="recent">
        <v-row>
          <RecentCard v-for="(recent, index) in recentlyViewed" :key="index" :recent="recent" />
        </v-row>
        <v-btn @click="clearRecentlyViewed" class="mt-10">Clear History</v-btn>
      </v-tabs-window-item>
    </v-tabs-window>
  </v-container>
  <AppFooter/>
</template>

<script>
import { fetchNews } from '@/api/newsAPI';
import NewsCard from '@/components/NewsCard.vue';

export default {
  components: { NewsCard },
  data() {
    return {
      tab: 'feeds',
      articles: [],
      recentlyViewed: [],
      loading: true
    };
  },
  async mounted() {
    this.articles = await fetchNews();
    this.loading = false;

    const storedRecentlyViewed = localStorage.getItem("recentlyViewed");
    if (storedRecentlyViewed) {
      this.recentlyViewed = JSON.parse(storedRecentlyViewed);
    }
  },
  methods: {
    addToRecentlyViewed(recentItems) {
      const items = Array.isArray(recentItems) ? recentItems : [recentItems];
    items.forEach((recent) => {
      const exists = this.recentlyViewed.find((item) => item.url === recent.url);
      if (!exists) {
        this.recentlyViewed.unshift(recent);
      if (this.recentlyViewed.length > 10) {
        this.recentlyViewed.pop();
      }
    }
     });
    localStorage.setItem("recentlyViewed", JSON.stringify(this.recentlyViewed));
    },
    clearRecentlyViewed() {
      this.recentlyViewed = [];
      localStorage.removeItem('recentlyViewed');
    }
  },
};
</script>
