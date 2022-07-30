const quick_search = document.createElement('form');
quick_search.setAttribute('id', 'my-search-js');

const searchBar = document.createElement('input');
searchBar.setAttribute('placeholder', 'Search...');
quick_search.appendChild(searchBar);

const submitBtn = document.createElement('button');
submitBtn.textContent = 'Search';
quick_search.appendChild(submitBtn);

function searchSwapi(text) {
  alert(text);
  // clear text
  searchBar.value = '';
}

quick_search.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = searchBar.value;
  if (text !== '') searchSwapi(text);
});

module.exports = quick_search;
