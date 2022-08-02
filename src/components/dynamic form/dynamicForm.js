import '../../style.scss';
/**
 *
 * @param {string} elmtType
 * @param {object} attributes - optional
 *
 * @returns {DOMElement}
 */
function createDomEl(elmtType, attributes, content) {
  const newDomEl = document.createElement(elmtType);

  if (attributes !== undefined) {
    for (const [attribute, value] of Object.entries(attributes)) {
      newDomEl.setAttribute(attribute, value);
    }
  }

  if (typeof content === 'string') {
    newDomEl.textContent = content;
  }

  return newDomEl;
}

function appendElements(elements, parent) {
  for (const el of elements) {
    parent.appendChild(el);
  }
}

/**
 * Creating DOM elements
 */

const dynamicForm = createDomEl('form', {
  id: 'myForm',
  autocomplete: 'off',
});

const fNameInput = createDomEl('input', {
  type: 'text',
  id: 'fName',
  name: 'firstName',
  required: 'true',
});

const fNameInputLabel = createDomEl(
  'label',
  {
    for: 'firstName',
  },
  'First name:'
);

const lNameInput = createDomEl('input', {
  type: 'text',
  id: 'lName',
  name: 'lastName',
  required: 'true',
});

const lNameInputLabel = createDomEl(
  'label',
  {
    for: 'lastName',
  },
  'Last name:'
);

const favColorDropdownLabel = createDomEl(
  'label',
  { for: 'colorsDropdown' },
  'Favorite Color:'
);
const favColorDropdown = createDomEl('input', {
  list: 'colors',
  name: 'colorsDropdown',
});
const favColorDropdownList = createDomEl('datalist', {
  id: 'colors',
});
const colors = ['red', 'blue', 'green', 'yellow', 'orange'];
colors.forEach((color) => {
  const colorOption = createDomEl('option', { value: color });
  favColorDropdownList.appendChild(colorOption);
});

const submitBtn = createDomEl(
  'input',
  {
    id: 'submitBtn',
    type: 'submit',
  },
  'Submit'
);

appendElements(
  [
    fNameInputLabel,
    fNameInput,
    lNameInputLabel,
    lNameInput,
    favColorDropdownLabel,
    favColorDropdown,
    favColorDropdownList,
    submitBtn,
  ],
  dynamicForm
);

/**
 * Event Listeners
 */

// dynamicForm.addEventListener('submit', (e) => {
//   e.preventDefault();
//   const allInputs = Array.from(document.querySelectorAll('input'));

//   let outputMsg;

//   if (allInputs.some((input) => input.value === '')) {
//     outputMsg += `Please fill out all required fields.`;
//   }

//   // allInputs.forEach((input) => {
//   //   if (input.value === '') {
//   //     outputMsg += `Please fill out information for ${input.name}. \n`;
//   //   }
//   // });

//   if (outputMsg === '') {
//     allInputs.forEach((input) => {
//       outputMsg += `${input.name}: ${input.value}`;
//     });
//   }

//   const alertDiv = createDomEl('div', {
//     class: 'alert',
//     style: 'z-index: 1',
//   });

//   const outputMsgEl = createDomEl('span', (content = outputMsg));
//   alertDiv.appendChild(outputMsgEl);

//   document.appendChild(alertDiv);
// });

export default dynamicForm;
