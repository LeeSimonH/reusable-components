import React, { useState } from 'react';

export default function DynamicForm () {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [colorChoice, setColorChoice] = useState('');
  const [submittedForms, setSubmittedForms] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    let outputStr = '';

    const formData = {
      firstName,
      lastName,
      colorChoice,
      timeSubmitted: new Date().toUTCString()
    }

    setSubmittedForms(prevForms => {
      prevForms.push(formData);
    });
    
    outputStr += 'Form successfully saved! \n';
    outputStr += `First name: ${firstName} \n`;
    outputStr += `Last name: ${lastName} \n`;
    outputStr += `Favorite color: ${colorChoice} \n`;
    outputStr += `Time submitted: ${formData.timeSubmitted} \n`

    alert(outputStr);
  }

  return (
    <div>
      <form id='myForm' autoComplete='off' onSubmit={e => handleSubmit(e)}>
        <label htmlFor="firstName">First name:</label>
        <input type="text" id='fName' name='firstName' value={firstName} onChange={e => setFirstName(e.target.value)} required />
        <label htmlFor="lastName">Last name:</label>
        <input type="text" id='lName' name='lastName' value={lastName} onChange={e => setLastName(e.target.value)} required />
        <label htmlFor="colorsDropdown">Favorite color:</label>
        <input list='colors' name='colorDropdown' value={colorChoice} onChange={(e) => setColorChoice(e.target.value)} required />

        <datalist id="colors">
          <option value="red"></option>  
          <option value="blue"></option>
          <option value="green"></option>  
          <option value="yellow"></option>
          <option value="orange"></option>  
          <option value="other"></option>
        </datalist>
        {colorChoice == 'other' ? 
          (<>
            <label htmlFor="otherColor">If "other," please specify:</label>
            <input type="text" id="otherColorInput" name="otherColor" />
          </>)
          : null
        }
        <input id="submitBtn" type='submit' />
      </form>
    </div>
  )
}