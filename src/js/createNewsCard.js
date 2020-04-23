import createNewElement from './createNewElement.js';
import readDate from './readDate.js';

export default function createNewsCard(text, date, id, icon = '') {
  const newsCard = createNewElement('div', 'news-card');
  newsCard.setAttribute('data-id', `${id}`);
  const newsIcon = createNewElement('div', 'news-icon', icon);
  const newsContent = createNewElement('div', 'news-content');
  const readedDate = readDate(date);
  const newsDate = createNewElement('div', 'news-date', `<p>${readedDate}</p>`);
  const newsText = createNewElement('div', 'news-text', `<p>${text}</p>`);

  newsContent.appendChild(newsDate);
  newsContent.appendChild(newsText);
  newsCard.appendChild(newsIcon);
  newsCard.appendChild(newsContent);

  return newsCard;
}
