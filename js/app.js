const headline = document.querySelector('.headline');
const ul = document.querySelector('.thumbnails');

async function fetchData() {
	const data = await fetch(
		'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Frss.cbc.ca%2Flineup%2Ftopstories.xml'
	);
	const response = await data.json();

	return response;
}

async function displayHeadline() {
	const res = await fetchData();
	res.items.map((el, index) => {
		console.log('el', el);
		console.log('index', index);
		headline.append(el.title);
	});
}

// render news headline, thumbnail and ID on browser
async function displayData() {
	const res = await fetchData();
	res.items.map((el) => {
		const img = document.createElement('img');

		img.src = el.thumbnail;

		// what is the difference between append and appendChild? they both work
		ul.append(img);
	});
}

displayHeadline();
displayData();

// TODO: display just one headline

// TODO: display just one headline at random

// TODO: add click events to thumbnails
