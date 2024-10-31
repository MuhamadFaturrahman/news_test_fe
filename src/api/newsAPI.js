// src/api/newsApi.js
import axios from 'axios';

export async function fetchNews() {
  try {
    const response = await axios.get('https://newsapi.org/v2/everything?q=tesla&from=2024-09-30&sortBy=publishedAt&apiKey=060c7176b3f340faa757ead58c310738');
    return response.data.articles.map(article => ({
      imageUrl: article.urlToImage,
      newsUrl: article.url,
      name: article.source.name,
      title: article.title,
      author: article.author || 'Unknown Author',
      date: article.publishedAt,
      newsDesc:article.description
    }));
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}
