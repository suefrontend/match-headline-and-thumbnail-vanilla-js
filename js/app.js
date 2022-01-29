const headlineContainer = document.querySelector('.headline');
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

	data.map((el, index) => {
		const li = document.createElement('li');
		const span = document.createElement('span');

		li.innerHTML = el.title;
		span.innerHTML = index;
		fragment.appendChild(li).appendChild(span);
	});

	headlineContainer.appendChild(fragment);
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

// TODO: display just one headline at random

// TODO: add click events to thumbnails

// TODO: shuffle thumbnails
