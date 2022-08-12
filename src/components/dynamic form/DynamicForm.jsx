import React from 'react';

export default function DynamicForm () {
  return (
    <div>
      <form id='myForm' autoComplete='off'>
        <label htmlFor="firstName">First name:</label>
        <input type="text" id='fName' name='firstName' required />
        <label htmlFor="lastName">Last name:</label>
        <input type="text" id='lName' name='lastName' required />
        <label htmlFor="colorsDropdown">Favorite color:</label>
        <input list='colors' name='colorDropdown' />
        <datalist id="colors">
          <option value="red"></option>  
          <option value="blue"></option>
          <option value="green"></option>  
          <option value="yellow"></option>
          <option value="orange"></option>  
          <option value="other"></option>
        </datalist>
          
        
      </form>
    </div>
  )
}