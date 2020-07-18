import React from 'react';
import './FaceRecognition.css';
import 'tachyons';

// This set of data is using this sample FaceImage Photo
// https://www.goldennumber.net/wp-content/uploads/2013/08/florence-colgate-england-most-beautiful-face.jpg

const FaceRecognition = ({ imageUrl, box }) => {
 /*Below the className is referring to the Tachyons Syntax*/
  return (
    <div className='center ma'>
      <div className='absolute mt2'>
  {/*The "width='500px' heigh='auto'* image property mean we want the width to be Fix at 500pixel 
   but we must let the Height to be 'Auto' adjust so that the Face Image will remain its Image Ratio */}
        <img id='inputimage' alt='' src={imageUrl} width='500px' heigh='auto'/>
        <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
      </div>
    </div>
  );
}

// Reference image Tag Code from the Clarifai Face Detection Sample:
// https://www.clarifai.com/models/face-detection-image-recognition-model-a403429f2ddf4b49b307e318f00e528b-detection#documentation
// <div class="bounding-box b57tuupc8m14" style="top: 14.6092%; right: 34.1902%; bottom: 71.5162%; left: 59.2917%;"><div class="bounding-box-concepts"><div class="concept bounding-box__concept" title="face (ai_8jtPl3Xj) : 0"><span class="concept__name">face</span><span class="concept__prediction-val">0.00</span></div></div></div>

// Testing Only. Just to grap a sample Picture and display it onto the Web Page just below the URL Detect Button
// const FaceRecognition = ({imageUrl}) => {
//   return (
//     <div className='center ma'>
//     	<img alt='Face_Photo' src={imageUrl} width='500px' heigh='auto'/>
//         {/*<img alt='Face_Photo' src={"https://samples.clarifai.com/face-det.jpg"} width='500px' heigh='auto'/>*/}

//     </div>
//   );
// }
//<div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
export default FaceRecognition;