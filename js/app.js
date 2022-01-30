const headline = document.querySelector('.headline__text');
const thumbnailsContainer = document.querySelector('.thumbnails');

async function fetchData() {
	const data = await fetch(
		'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Frss.cbc.ca%2Flineup%2Ftopstories.xml'
	);
	const response = await data.json();
	return response;
}

async function renderHeadline() {
	const res = await fetchData();
	const data = res.items;

	const fragment = document.createDocumentFragment();

  // TODO: display just one headline at random

  // 1. generate a random integer in the range of 0 to 9
  const indexOfAnswer = Math.floor(Math.random() * 10);
  headline.innerHTML = data[indexOfAnswer].title;
  
  // 2. append index to the headline
  data.map((el, index) => {    
    if(el.title === data[indexOfAnswer].title) {
      headline.append(` - ${index}`)
    }
  })
}

async function renderThumbnails() {
	const res = await fetchData();
	const fragment = document.createDocumentFragment();

	res.items.map((el, index) => {
		const li = document.createElement('li');
		const img = document.createElement('img');
		const span = document.createElement('span');
		img.src = el.thumbnail;
		span.innerHTML = index;

		li.appendChild(img);
		li.appendChild(span);
		fragment.appendChild(li);
	});

	thumbnailsContainer.appendChild(fragment);
}

renderHeadline();
renderThumbnails();

// TODO: add click events to thumbnails

// TODO: shuffle thumbnails
