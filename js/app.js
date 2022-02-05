const headline = document.querySelector('.headline__title');
const thumbnailsContainer = document.querySelector('.thumbnail');
const detail = document.querySelector('.detail');

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
    li.classList.add(`thumbnail__item-${el}`);
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

renderHeadline();
renderThumbnails();
generateAnswer();

// TODO: add click events to thumbnails

thumbnailsContainer.addEventListener('click', function(e) {

  if(isPlaying) {
    
    // TODO: add condition when fire thumbnail click event
    if(e.target.parentNode.parentNode.className.includes(indexOfAnswer)) {
      console.log("correct?")
  
      // const btn = document.createElement('button')
  
        // TODO: change text in <span>
        e.target.parentNode.parentNode.children[1].textContent += 'Correct! Click for Detail';
        // e.target.parentNode.parentNode.appendChild(btn);
        // btn.textContent = 'See Detail';
        isPlaying = false;
  
        e.target.parentNode.parentNode.children[1].addEventListener('click', function() {
          render(indexOfAnswer);
        })    
      } else {
        console.log("correct?")
        e.target.parentNode.parentNode.children[1].classList.add('text-lower-opacity')
        e.target.parentNode.parentNode.children[1].textContent += 'Incorrect';
    }
  }
})


// TODO: display news detail when correct thumbnail was clicked

async function render(answer) {

  const res = await fetchData()
  const data = res.items;
  
  const markup = `
    <button class="btn btn-close" onClick="resetQuiz()">X CLOSE</button>
    <h3>TITLE:   ${data[answer].title}</h3>
    <span> ${data[answer].pubDate}</span>
    <p>DESCRIPTION: ${data[answer].description}</p>
    <a href=${data[answer].link} target="_blank">Read on CBC website</a>
  `;

  detail.innerHTML += markup;

}

function generateAnswer() {
  indexOfAnswer = Math.floor(Math.random() * 10);
  return indexOfAnswer;
}

function resetQuiz() {

  detail.innerHTML = '';
  headline.innerHTML = ''
  thumbnailsContainer.innerHTML = ''

  renderHeadline();
  renderThumbnails();
  generateAnswer();
  isPlaying = true;

}

// TODO: fix - if answer is wrong make it display 'wrong' only once
