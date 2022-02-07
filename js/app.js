const headline = document.querySelector('.headline__heading');
const thumbnailsContainer = document.querySelector('.thumbnail__list');
const detail = document.querySelector('.detail');
const overlay = document.querySelector('.overlay');

let isPlaying = true;

async function fetchData() {
	const data = await fetch(
		'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Frss.cbc.ca%2Flineup%2Ftopstories.xml'
	);
	const response = await data.json();
	return response;
}

let indexOfAnswer;

async function renderHeadline() {
	const res = await fetchData();
	const data = res.items;

	const fragment = document.createDocumentFragment();

  // TODO: display just one headline at random

  // 1. generate a random integer in the range of 0 to 9
  headline.innerHTML = data[indexOfAnswer].title;
  
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
    li.classList.add(`thumbnail__item-${el}`, 'thumbnail-zoom');
    const figure = document.createElement('figure');
    figure.classList.add('thumbnail__item__img');
		const img = document.createElement('img');
    img.src = res.items[el].thumbnail;
		const span = document.createElement('span');
    span.classList.add('thumbnail__item__text')
		span.innerHTML = ' ';

		li.appendChild(figure);
    figure.appendChild(img);
		li.appendChild(span);
		fragment.appendChild(li);
  })  
	thumbnailsContainer.appendChild(fragment);
}


// TODO: add click events to thumbnails

thumbnailsContainer.addEventListener('click', function(e) {

  if(isPlaying) {
    
    // TODO: add condition when fire thumbnail click event
    if(e.target.parentNode.parentNode.className.includes(indexOfAnswer)) {
    
        // TODO: change text in <span>
        e.target.parentNode.classList.add('thumbnail-overlay')
        
        e.target.parentNode.parentNode.children[1].textContent += 'Correct! Click for Detail';   

        e.target.parentNode.parentNode.classList.remove('thumbnail-zoom');
        e.target.parentNode.parentNode.classList.add('thumbnail-bigger');
        
        Array.from(e.target.parentNode.parentNode.parentNode.children).forEach(el => {

          if(!el.className.includes(indexOfAnswer)) {
            el.classList.remove('thumbnail-zoom')
            el.classList.add('thumbnail-no-pointer')
          }
        })
        e.target.parentNode.parentNode.classList.remove('thumbnail-pointer');
        
        isPlaying = false;
        
        e.target.parentNode.parentNode.addEventListener('click', function() {
          render(indexOfAnswer);
        })    
      } else {
        e.target.parentNode.parentNode.classList.remove('thumbnail-zoom');
        e.target.parentNode.parentNode.classList.add('thumbnail-no-pointer');
        e.target.parentNode.parentNode.children[1].classList.add('text-lower-opacity');
        e.target.parentNode.parentNode.children[1].textContent = 'Incorrect';
    }
  }
})


// TODO: display news detail when correct thumbnail was clicked

async function render(answer) {

  const res = await fetchData()
  const data = res.items;
  
  const desc = data[answer].description;

  const detailImg = desc.match(/<img[^>]+>/gi);
  const detailTxt = desc.match(/<p>(.*?)<\/p>/g);

  detail.classList.add('visible');
  
  const markup = `
  <div class="detail__img">
    ${detailImg}
    <svg class="icon icon-cross" onClick="resetQuiz()">
      <use xlink:href="images/sprite.svg#icon-cancel-circle"></use>
    </svg>
  </div>
  <div class="detail__content">
    <span class="detail__date"> ${data[answer].pubDate}</span>
    <h3 class="detail__heading">${data[answer].title}</h3>
    ${detailTxt}
    <div class="detail__link">
      <a class="btn btn-link" href=${data[answer].link} target="_blank">Read on CBC website</a>
    </div>
  </div>
  `;
  
  detail.innerHTML += markup;
  overlay.classList.add('visible');
  
}

function generateAnswer() {
  indexOfAnswer = Math.floor(Math.random() * 10);
  return indexOfAnswer;
}

overlay.addEventListener('click', function() {
  resetQuiz();
})

function resetQuiz() {
  overlay.classList.remove('visible');
  detail.innerHTML = '';
  detail.classList.remove('visible');
  headline.innerHTML = ''
  thumbnailsContainer.innerHTML = ''

  renderHeadline();
  renderThumbnails();
  generateAnswer();
  isPlaying = true;
}

document.addEventListener('DOMContentLoaded', () => {
  renderHeadline();
  renderThumbnails();
  generateAnswer();
})
