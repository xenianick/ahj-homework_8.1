/* eslint-disable no-param-reassign */

export default function addNewsCard(newsJson, container, cardHandler) {
  const news = JSON.parse(newsJson);
  const newsCard = cardHandler(news.message, news.date, news.id, news.icon);
  container.appendChild(newsCard);
  container.scrollTop = container.scrollHeight;
}
