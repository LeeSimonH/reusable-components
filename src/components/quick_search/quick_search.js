// import '../../style.scss';

/**
 * creating DOM elements, setting attributes
 */
const quick_search = document.createElement('form');
quick_search.setAttribute('id', 'my-search');
quick_search.setAttribute('autocomplete', 'off');
quick_search.setAttribute('action', '/action_page.php');

/**
 * <form id="my-search" autocomplete="off" action="/.action_page.php">
 * </form>
 */

const autocompleteDiv = document.createElement('div');
autocompleteDiv.setAttribute('class', 'autocomplete');
quick_search.appendChild(autocompleteDiv);

/**
 * <form id="my-search" autocomplete="off" action="/.action_page.php">
 *   <div class="autocomplete">
 *   </div>
 * </form>
 */

// const searchFilterDropdown = document.createElement('div');
// searchFilterDropdown.setAttribute('id', 'search-filters');
// quick_search.appendChild(searchFilterDropdown);

const searchBar = document.createElement('input');
searchBar.setAttribute('id', 'search-input');
searchBar.setAttribute('placeholder', 'People...');
searchBar.setAttribute('type', 'text');
autocompleteDiv.appendChild(searchBar);

/**
 * <form id="my-search" autocomplete="off" action="/.action_page.php">
 *   <div class="autocomplete">
 *     <input id="search-input" type="text" placeholder="People...">
 *     </input>
 *   </div>
 * </form>
 */

const submitBtn = document.createElement('input');
submitBtn.setAttribute('type', 'submit');
quick_search.appendChild(submitBtn);

/**
 * <form id="my-search" autocomplete="off" action="/.action_page.php">
 *   <div class="autocomplete">
 *     <input id="search-input" type="text" placeholder="People...">
 *   </div>
 *   <input type="submit">
 * </form>
 */

/**
 * autocomplete information
 */

const peopleNames = [];

const fetchPeopleData = async (url) => {
  await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const peopleArr = data.results;

      for (const { name } of peopleArr) {
        peopleNames.push(name);
      }
      return data.next;
    });
};

function getPeopleNames() {
  let baseurl = 'https://swapi.dev/api/people';
  fetchPeopleData(baseurl);
  for (let page = 2; page < 9; page++) {
    fetchPeopleData(baseurl + '/?page=' + page);
  }
}

getPeopleNames();
console.log('all names: ', peopleNames);

/**
 * defining functions
 */

function searchSwapi(text) {
  clearCardDisplay();

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

function autocomplete(input, arr) {
  let currentFocus;

  searchBar.addEventListener('input', function (e) {
    let a,
      b,
      val = this.value;

    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;

    // create div element that will contain the items (values)
    a = document.createElement('div');
    a.setAttribute('id', this.id + 'autocomplete-list');
    a.setAttribute('class', 'autocomplete-items');

    this.parentNode.appendChild(a);

    for (let i = 0; i < arr.length; i++) {
      let subtring = arr[i].substr(0, val.length);
      // check if item starts with same letters as the text input field value
      if (subtring.toUpperCase() == val.toUpperCase()) {
        // create a div for each matching element
        b = document.createElement('div');
        // make matching letters bold
        b.innerHTML = '<strong>' + subtring + '</strong>';
        b.innerHTML += arr[i].substr(val.length);
        // insert a input field that will hold the current array item's value:
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";

        /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener('click', function (e) {
          /*insert the value for the autocomplete text field:*/
          input.value = this.getElementsByTagName('input')[0].value;
          /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });

  /*execute a function presses a key on the keyboard:*/
  searchBar.addEventListener('keydown', function (e) {
    var x = document.getElementById(this.id + 'autocomplete-list');
    if (x) x = x.getElementsByTagName('div');
    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
      currentFocus++;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 38) {
      //up
      /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
      currentFocus--;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();
      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (x) x[currentFocus].click();
      }
    }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add('autocomplete-active');
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove('autocomplete-active');
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName('autocomplete-items');
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != searchBar) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
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

function clearCardDisplay() {
  if (document.querySelector('.card-display')) {
    const cardDisplay = document.querySelector('.card-display');
    cardDisplay.parentElement.removeChild(cardDisplay);
  }
}

/**
 * adding Event Listeners to DOM elements
 */

quick_search.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = searchBar.value;
  if (text !== '') searchSwapi(text);
});

autocomplete(document.getElementById('search-input'), peopleNames);

export default quick_search;
