import createNewElement from './createNewElement.js';
import StreamMatch from './StreamMatch.js';

const bodyEl = document.querySelector('body');

const mainContainer = createNewElement('div', 'main-container');
const widgetContainer = createNewElement('div', 'widget-container');
const newsContainer = createNewElement('div', 'news-container');

widgetContainer.appendChild(newsContainer);
mainContainer.appendChild(widgetContainer);

bodyEl.insertBefore(mainContainer, bodyEl.firstChild);

const match = new StreamMatch('https://ahj-homework-8-1.herokuapp.com');
match.restoreNews(newsContainer);
match.listenNews(newsContainer);
