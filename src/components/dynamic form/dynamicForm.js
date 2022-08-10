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
  type: 'select',
  list: 'colors',
  name: 'colorsDropdown',
});
const favColorDropdownList = createDomEl('datalist', {
  id: 'colors',
});
const colors = ['red', 'blue', 'green', 'yellow', 'orange', 'other'];
colors.forEach((color) => {
  const colorOption = createDomEl('option', { value: color });
  favColorDropdownList.appendChild(colorOption);
});

const otherColorLabel = createDomEl(
  'label',
  {
    for: 'otherColor',
  },
  'If "other," please specify:'
);
const otherColorInput = createDomEl('input', {
  type: 'text',
  name: 'otherColor',
  id: 'otherColorInput',
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
favColorDropdown.addEventListener('change', (e) => {
  // console.log(e.target.value);
  if (e.target.value == 'other') {
    // if the otherColorInput isn't already on the DOM
    if (!document.getElementById('otherColorInput')) {
      // add the input and the label to the dom after the color input
      favColorDropdown.parentNode.insertBefore(
        otherColorInput,
        favColorDropdown.nextSibling
      );
      favColorDropdown.parentNode.insertBefore(
        otherColorLabel,
        favColorDropdown.nextSibling
      );
    }
  } else if (e.target.value != 'other') {
    if (document.getElementById('otherColorInput')) {
      otherColorInput.parentNode.removeChild(otherColorInput);
      otherColorLabel.parentNode.removeChild(otherColorLabel);
    }
  }
});

dynamicForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const allInputs = Array.from(document.querySelectorAll('input'));
  console.log(allInputs);

  let outputMsg = '';

  if (allInputs.some((input) => input.value == '' && input.type != 'submit')) {
    outputMsg += `Please fill out all required fields.`;
  }

  // allInputs.forEach((input) => {
  //   if (input.value === '') {
  //     outputMsg += `Please fill out information for ${input.name}. \n`;
  //   }
  // });

  if (outputMsg === '') {
    allInputs.forEach((input) => {
      outputMsg += `${input.name}: ${input.value}`;
    });
  }

  alert(outputMsg);

  // const alertDiv = createDomEl('div', {
  //   class: 'alert',
  //   style: 'z-index: 1',
  // });

  // const outputMsgEl = createDomEl('span', { content: outputMsg });
  // alertDiv.appendChild(outputMsgEl);

  // document.appendChild(alertDiv);
});

export default dynamicForm;
