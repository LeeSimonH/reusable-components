const quick_search = document.createElement('form');
quick_search.setAttribute('id', 'my-search-js');

const searchBar = document.createElement('input');
searchBar.setAttribute('placeholder', 'Search...');
quick_search.appendChild(searchBar);

const submitBtn = document.createElement('button');
submitBtn.textContent = 'Search';
quick_search.appendChild(submitBtn);

function searchSwapi(text) {
  // alert(text);

  const SWAPIbaseURL = 'https://swapi.dev/api/';

  fetch(SWAPIbaseURL + text)
    .then((response) => response.json())
    .then((data) => {
      const cardDisplay = document.createElement('div');
      cardDisplay.setAttribute('class', 'card-display');

      for (const result of data.results) {
        const card = createDataCard(result);
        cardDisplay.appendChild(card);
      }

      document.getElementById('root').appendChild(cardDisplay);
    });
}

function createDataCard(dataObj) {
  // console.log(dataObj);
  const { name, height, mass, hair_color, eye_color, skin_color } = dataObj;

  const card = document.createElement('div');
  card.setAttribute('class', 'data-card');

  const nameTag = document.createElement('h1');
  nameTag.classList.add('card-name');
  nameTag.textContent = name;
  card.appendChild(nameTag);

  const dataList = document.createElement('ul');
  card.appendChild(dataList);

  const heightTag = document.createElement('li');
  heightTag.classList.add('card-height');
  heightTag.textContent = `height: ${height}`;

  const massTag = document.createElement('li');
  massTag.classList.add('card-mass');
  massTag.textContent = `mass: ${mass}`;

  const hairColorTag = document.createElement('li');
  hairColorTag.classList.add('card-hairColor');
  hairColorTag.textContent = `hair color: ${hair_color}`;

  const eyeColorTag = document.createElement('li');
  eyeColorTag.classList.add('card-eyeColor');
  eyeColorTag.textContent = `eye color: ${eye_color}`;

  const skinColorTag = document.createElement('li');
  skinColorTag.classList.add('card-skinColor');
  skinColorTag.textContent = `skin color: ${skin_color}`;

  const cardAttributes = [
    heightTag,
    massTag,
    hairColorTag,
    eyeColorTag,
    skinColorTag,
  ];
  for (const tag of cardAttributes) dataList.appendChild(tag);

  return card;
}

quick_search.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = searchBar.value;
  if (text !== '') searchSwapi(text);
});

module.exports = quick_search;
