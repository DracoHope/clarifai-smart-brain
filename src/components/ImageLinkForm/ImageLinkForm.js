import React from 'react';
import './ImageLinkForm.css';


// ***********************************************
// Tutor Working code
const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div>
      <h1>Ming Project</h1>
    {/* Take note: All the below className are for Tachyons styling as for the className='center' can also be found in App.css*/}
      <p className='f3'>
      {/**/}
        {'This Magic Brain will detect faces in your pictures. Git it a try.'}
      </p>
      {/*Take NOte this className='center is found in the App.css*/}
      <div className='center'>
        {/*Take NOte The "form" class will set the actual width od the Text input and the biutton */}
        <div className='form center pa4 br3 shadow-5'>
          {/* "w-70" mean width of 70% */}
          <input className='f4 pa2 w-70 center' type='tex' onChange={onInputChange}/>
          {/* "grow" is the effect when we hover over the Button */}
          {/* "w-30" mean width of 30% since we already 70% for the Text input */}
          <button
            className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
            onClick={onButtonSubmit}>Detect</button>
        </div>
      </div>
    </div>
  );
}

export default ImageLinkForm;

// Css for the className='center' in App.js using Flex and content align center
// .center {
//   display: flex;
//   justify-content: center;
// }
