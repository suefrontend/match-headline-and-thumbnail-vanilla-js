const headline = document.querySelector('.headline__text');
const thumbnailsContainer = document.querySelector('.thumbnails');

async function fetchData() {
	const data = await fetch(
		'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Frss.cbc.ca%2Flineup%2Ftopstories.xml'
	);
	const response = await data.json();
	return response;
}

const indexOfAnswer = Math.floor(Math.random() * 10);

async function renderHeadline() {
	const res = await fetchData();
	const data = res.items;

	const fragment = document.createDocumentFragment();

  // TODO: display just one headline at random

  // 1. generate a random integer in the range of 0 to 9
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

  // TODO: display 4 random thumbnails (one of the thumbnail must be corresponding to the headline)
  
  // 1. create an array with 9 random numbers without duplicate
  const indices = [indexOfAnswer];
  const numOfTotalThumbnails = 10;
  
  for (let i = 0; i < numOfTotalThumbnails; i++) {
    let randomThumbnailIndex = Math.floor(Math.random() * 9);
        
    if(!indices.includes(randomThumbnailIndex)) {
      indices.push(randomThumbnailIndex)
    }
  }

  const thumbnailIndices = indices.slice(0, 4)
  
  // 2. shuffle the array
  thumbnailIndices.sort(() => Math.random() - 0.5)
  
  // 3. create elements for four thumbnails
  thumbnailIndices.forEach((el, index) => {    
    const li = document.createElement('li');
		const img = document.createElement('img');
		const span = document.createElement('span');
		img.src = res.items[el].thumbnail;
		span.innerHTML = el;

		li.appendChild(img);
		li.appendChild(span);
		fragment.appendChild(li);
  })  
	thumbnailsContainer.appendChild(fragment);
}

renderHeadline();
renderThumbnails();

// TODO: add click events to thumbnails

// TODO: add condition when fire thumbnail click event

// TODO: display news detail when click on thumbnail

// TODO: add reset button
