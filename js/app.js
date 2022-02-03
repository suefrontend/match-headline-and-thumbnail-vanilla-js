const headline = document.querySelector('.headline__text');
const thumbnailsContainer = document.querySelector('.thumbnail');
const detail = document.querySelector('.detail');
// const closeBtn = document.querySelector('.btn__close');

let isPlaying = true;

async function fetchData() {
	const data = await fetch(
		'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Frss.cbc.ca%2Flineup%2Ftopstories.xml'
	);
	const response = await data.json();
	return response;
}

const indexOfAnswer = Math.floor(Math.random() * 10);
console.log("answer", indexOfAnswer)

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
    li.classList.add(`thumbnail__item-${el}`);
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

  thumbnailsContainer.addEventListener('click', function(e) {


    if(isPlaying) {
      
      // TODO: add condition when fire thumbnail click event
      if(e.target.parentNode.className.includes(indexOfAnswer)) {
    
        const btn = document.createElement('button')
    
          // TODO: change text in <span>
          e.target.parentNode.children[1].textContent += 'Correct!';
          e.target.parentNode.appendChild(btn);
          btn.textContent = 'See Detail';
          isPlaying = false;
          console.log("isPlaying", isPlaying)
    
          btn.addEventListener('click', function() {
            render(indexOfAnswer);
          })
    
    
        } else {
          e.target.parentNode.children[1].textContent += 'Wrong!';
      }
    }
  })


// TODO: display news detail when correct thumbnail was clicked

async function render(answer) {

  const res = await fetchData()
  const data = res.items;
  
  const markup = `
    <h3>TITLE:   ${data[answer].title}</h3>
    <span> ${data[answer].pubDate}</span>
    <p>DESCRIPTION: ${data[answer].description}</p>
    <a href=${data[answer].link} target="_blank">Read on CBC website</a>
  `;

  detail.innerHTML = markup;

}

// TODO: add reset/load another question button
