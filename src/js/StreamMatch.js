/* eslint-disable no-param-reassign */
import createNewsCard from './createNewsCard.js';
import addNewsCard from './addNewsCard.js';

export default class StreamMatch {
  constructor(url) {
    this.url = url;
  }

  async restoreNews(container) {
    container.innerHTML = '';
    const response = await fetch(this.url);
    if (response.ok) {
      const matchArchive = await response.json();
      matchArchive.forEach((item) => {
        addNewsCard(item, container, createNewsCard);
      });
    }
  }

  listenNews(container) {
    const eventSource = new EventSource(`${this.url}/sse`);
    eventSource.addEventListener('end', () => {
      eventSource.close();
    });
    eventSource.addEventListener('action', (event) => {
      addNewsCard(event.data, container, createNewsCard);
    });
    eventSource.addEventListener('freekick', (event) => {
      addNewsCard(event.data, container, createNewsCard);
    });
    eventSource.addEventListener('goal', (event) => {
      addNewsCard(event.data, container, createNewsCard);
    });
  }

  async getNews(container) {
    this.listenNews(container);
    this.restoreNews(container);
  }
}
