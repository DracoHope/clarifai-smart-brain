import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import './App.css';

// This set of data is using this sample FaceImage Photo
// https://www.goldennumber.net/wp-content/uploads/2013/08/florence-colgate-england-most-beautiful-face.jpg
// https://www.picpng.com/uploads/Woman_Face_PNG_Image_32782.Png
// https://samples.clarifai.com/face-det.jpg

//*********** ClariFai Facerecognition IMport and Declaration **************
// Refer to https://docs.clarifai.com/api-guide/api-overview/api-clients
// Clarifai Installation and import guide
//const Clarifai = require('clarifai');

// Must also install Clarifai by the NPM
// npm install clarifai

const app = new Clarifai.App({
 apiKey: '85f1845f69774c169740eb3ee05016fb'
});
//**************************************************************************

const particlesOptions = {
  particles: {
    number: {
      value: 388,
      density: {
        enable: true,
        value_area: 1000
      }
    }
  }
}

// lecture 311
// Creating an Initial State
const initialState = {

      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
}




class App extends Component {

// { Creating a "state" Object }
  constructor() {
    super();
    this.state = initialState;
    // this.state = {
    //   input: '',
    //   imageUrl: '',
    //   box: {},
    //   route: 'signin',
    //   isSignedIn: false,
    //   user: {
    //     id: '',
    //     name: '',
    //     email: '',
    //     entries: 0,
    //     joined: ''
    //   }
    // }
  }


// This is to load the user profile when the Database response with the user information
// The "data" is the info from the database server
// This "user" object is the user who have successfully signin 
  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }


// ****************************************************************
// This section of code with componentDidMount() method is for testing connecting to the Database Server only
// Referring to the Lecture 282 - Connecting to Database Server
// We are going to connect our Application to the Database Server
// This "componentDidMount()" method is the React Lifecycle Hook method therefore no need to use arrow function
// http://localhost:2900 is the url for the "smart-brain-api" Database Server
// componentDidMount() {
//   fetch('http://localhost:2900/')
//   .then(response => response.json())
//   .then(data => console.log(data))
// }
// or
// componentDidMount() {
//   fetch('http://localhost:2900')
//   .then(response => response.json())
//   .then(console.log)
// }
// ****************************************************************



// The "route" Property will keep track of where we are in the Web Browser
// We want the App to start at the Sign In form therefore we declare as route: 'signin',

// The "box" property is an object which will contain the 
//Face Rectangle Box Coordinate whic we received from the response as follow:
// Reference: https://www.clarifai.com/models/face-detection-image-recognition-model-a403429f2ddf4b49b307e318f00e528b-detection#documentation
      // "data": {
      //   "regions": [
      //     {
      //       "region_info": {
      //         "bounding_box": {
      //           "top_row": 0.22296476,
      //           "left_col": 0.6717238,
      //           "bottom_row": 0.33909792,
      //           "right_col": 0.74911636
      //         }
      //       }
      //     },
// We need to create a Function which using the data from the response and 
// will Calculate the Actual Corodinate of the Box
// The Function we created is "calculateFaceLocation"
// { ************************* }

// Function to Calculate the Coordinate of the Box and assign it to the "state" box object
calculateFaceLocation = (data) => {

  const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;

  // After getting the data we will do some DOM manipulation
  // The Id of 'inputimage' is the Id which is in the FaceRecognition.js <img> Tag to be display
  const image = document.getElementById('inputimage');

  // Calculate the actual coordinate from the obtain data
  // Please take note: The data is a JSON object so it is a string
  // Therefore we need to wrap it in the "Number()" syntax for calculation
  const width = Number(image.width);
  const height = Number(image.height);
  console.log("calculateFaceLocation: ", width, height);

  // Basically the below Calculation will calculate the 4 coordinate for the
  // Rectangle Box base on the image.width and image.heigh of the actual image
  // and the data from the response in percentages
  // The data format are as follow in percentages:
  // {top_row: 0.18489629, left_col: 0.20235789, bottom_row: 0.80302954, right_col: 0.8127506}
  // bottom_row: 0.80302954
  // left_col: 0.20235789
  // right_col: 0.8127506
  // top_row: 0.18489629
  // Please Take note: The 4 coordinate is base on the Image Width and Heigh
  return {
  leftCol: clarifaiFace.left_col * width,
  topRow: clarifaiFace.top_row * height,
  rightCol: width - (clarifaiFace.right_col * width),
  bottomRow: height - (clarifaiFace.bottom_row * height)
  }
}


// This function will set the new value of the "state" property "box" object
  displayFaceBox = (box) => {
    this.setState({box: box});
    console.log("value of the box Property: ", box);
  }


//   calculateFaceLocation = (data) => {
//     const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
//     const image = document.getElementById('inputimage');
//     const width = Number(image.width);
//     const height = Number(image.height);
//     return {
//       leftCol: clarifaiFace.left_col * width,
//       topRow: clarifaiFace.top_row * height,
//       rightCol: width - (clarifaiFace.right_col * width),
//       bottomRow: height - (clarifaiFace.bottom_row * height)
//     }
//   }


// { Create a Event function "onInputChange" for the input text change }
// { Remember to use the Arrow Function Syntax to avoid Error }
// { Whenever there ia EventListener Event, We will receive an "event" which cntain it value and property }
  onInputChange = (event) => {
    console.log(event.target.value);
    // To get the input value from the "event" use this "event.target.value"
    this.setState({input: event.target.value});
  }

// { *************************}

  onButtonSubmit = () => {
    console.log('Imgae Detect Click Detected!!!');
    this.setState({imageUrl: this.state.input});
    fetch('https://nameless-temple-56098.herokuapp.com/imageurl', {//https://nameless-temple-56098.herokuapp.com/
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      // This will attached the image URL into the 'req.body' and send to the Backend 'imageurl' endpoint
      // Then the handleApiCall will be exetuted to perform the Clarifai API call
      input: this.state.input
        })
      })
    .then(response => response.json())
    .then( response => {  
      console.log(response);
      console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
        if (response) {https://nameless-temple-56098.herokuapp.com/
          //fetch('http://localhost:2900/image', {
          fetch('https://nameless-temple-56098.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
              // Thw below code will cause the entire user object to be updated so other user info will be lost
              //this.setState({user:{entries:count}})
            })  // Lecture 311 - Code Review - Always good to have a catch statment after a .then statment
            .catch(err => {
              console.log(err);
            })
        }
      this.displayFaceBox(this.calculateFaceLocation(response));
      },// Code within the ".then ()response" function
    ) // Closing of  ".then ()response" function
    // This is the ".catch" Error function which will beable to catch any error occur during this Face Detection Process
    .catch(err => console.log(err));
  }


// This function mainly to check where we are currently at which Page of the Appliaction
  onRouteChange = (route) => {
    // When isSignedIn: false means the user have signout or signin is not successful
    if (route === 'signout') {
      // When signin out we want to reset the current state to the initial State
      // The initialState will also set the isSignedIn to false
      this.setState(initialState)
      //this.setState({isSignedIn: false})
    } else if (route === 'home') {
      // When isSignedIn: true means the user have signIn or User signin is successful
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});


    // if (route === 'signout') {
    //   this.setState({isSignedIn: false})
    // } else if (route === 'home') {
    //   this.setState({isSignedIn: true})
    // }
    // this.setState({route: route});

    // For Testing only. Just change the "route" state to "home"
    // We do not want to hardcode the route therefore we can assign the input parameter route
    //this.setState({route: 'home'});

    // This below syntax mean no matter what we want to change the route according to the input parameter "route"
    // Therefore we are assigning the state "route" to the input parameter "route"
    this.setState({route: route});
  }

  //   onRouteChange = (route) => {
  //   // When isSignedIn: false means the user have signout or signin is not successful
  //   if (route === 'signout') {
  //     this.setState({isSignedIn: false})
  //   } else if (route === 'home') {
  //     // When isSignedIn: true means the user have signIn or User signin is successful
  //     this.setState({isSignedIn: true})
  //   }
  //   this.setState({route: route});


  //   // if (route === 'signout') {
  //   //   this.setState({isSignedIn: false})
  //   // } else if (route === 'home') {
  //   //   this.setState({isSignedIn: true})
  //   // }
  //   // this.setState({route: route});

  //   // For Testing only. Just change the "route" state to "home"
  //   // We do not want to hardcode the route therefore we can assign the input parameter route
  //   //this.setState({route: 'home'});

  //   // This below syntax mean no matter what we want to change the route according to the input parameter "route"
  //   // Therefore we are assigning the state "route" to the input parameter "route"
  //   this.setState({route: route});
  // }


// Sample Face Photo for testing
// https://www.goldennumber.net/wp-content/uploads/2013/08/florence-colgate-england-most-beautiful-face.jpg
// The below is the response in Web Browser Console of where is the 
// actual "region" data which we are interested in
// This set of data is using this sample
// https://www.goldennumber.net/wp-content/uploads/2013/08/florence-colgate-england-most-beautiful-face.jpg
// ***************************************************
// outputs: Array(1)
// 0:
// created_at: "2020-07-06T12:45:11.144048655Z"
// data:
// regions: Array(1)
// 0:
// data: {concepts: Array(1)}
// id: "3mwp3cr0otjz"
// region_info:
// bounding_box:
// bottom_row: 0.80302954
// left_col: 0.20235789
// right_col: 0.8127506
// top_row: 0.18489629
// ***************************************************
// The above data is base on the Clarfai Face Detection Model Data Docunment as shown below
// Therefore base on the actal data we need to to access the following Array element:
// Step 1: Access the "outputs" Array
// Step 2: Access the first eleement of the Array index '0'
// Step 3: Access its "data" Property
// Step 4: Access its "region" Array and goto its first element of this "region" Array
// Step 5: Access its "region_info" Property
// Step 6: Access its "bounding_box" Property
// From the "bounding_box" Property we can get the Rectangle Box Coordinate which will contain the Face


// The below is the Clarifai Face Detection Model data format
// Referenece https://www.clarifai.com/models/face-detection-image-recognition-model-a403429f2ddf4b49b307e318f00e528b-detection#documentation
      // "data": {
      //   "regions": [
      //     {
      //       "region_info": {
      //         "bounding_box": {
      //           "top_row": 0.22296476,
      //           "left_col": 0.6717238,
      //           "bottom_row": 0.33909792,
      //           "right_col": 0.74911636
      //         }
      //       }
      //     }

//COLOR_MODEL: 'eeed0b6733a644cea07cf4c60f87ebb7',
  // onButtonSubmit = () => {
  //   this.setState({imageUrl: this.state.input});
  //   app.models
  //     .predict(
  //       Clarifai.FACE_DETECT_MODEL,
  //       this.state.input)
  //     .then(response => {
  //       if (response) {
  //         fetch('http://localhost:3000/image', {
  //           method: 'put',
  //           headers: {'Content-Type': 'application/json'},
  //           body: JSON.stringify({
  //             id: this.state.user.id
  //           })
  //         })
  //           .then(response => response.json())
  //           .then(count => {
  //             this.setState(Object.assign(this.state.user, { entries: count}))
  //           })

  //       }
  //       this.displayFaceBox(this.calculateFaceLocation(response))
  //     })
  //     .catch(err => console.log(err));
  // }
// { *************************}


// Actually we cannot write any code inside the return statment
// But because this is JSX so we can implement some logic inside the return statement within the {}

  render() {

{/* We can create a Destructuring to simplify the variable used */}
  const { isSignedIn, imageUrl, route, box } = this.state;

      return (
    <div className="App">

{/* This is the code to generate the Particle Background Place in directly under the main <div> }
{/* Refer: https://www.npmjs.com/package/react-particles-js */}
{/* When using this Particles Background we must do some CSS setting else it will not show properly as the background */}
{/* Refer the className='particles' in the App.css*/}
         <Particles className='particles'
          params={particlesOptions}
        />
{/* ******************************************************* */}

{/* ******************Implement some Login to Keep Track of the "route" where we are in the App ************* */}
{/* We Must pass in the isSignIn state into the Navigation Component so that it can Display the "SignOut" Tag" */}
{/* If the route is "home" then we only want to display all the components for the Home Page only */}
      <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
    {

      this.state.route === 'home' 
      ? <div>
          <Logo />
          <Rank name={this.state.user.name} entries={this.state.user.entries}/>
          <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
          <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
        </div>
      : (
          this.state.route === 'signin' 
            ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
        )
    }
    </div>
   );
  
  }///*End of Render Method*/



}
<Signin onRouteChange={this.onRouteChange}/>
export default App;




//You must add your own API key here from Clarifai.
// const app = new Clarifai.App({
//  apiKey: 'YOUR_API_HERE'
// });

// const particlesOptions = {
//   particles: {
//     number: {
//       value: 30,
//       density: {
//         enable: true,
//         value_area: 800
//       }
//     }
//   }
// }

// class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//       input: '',
//       imageUrl: '',
//       box: {},
//       route: 'signin',
//       isSignedIn: false,
//       user: {
//         id: '',
//         name: '',
//         email: '',
//         entries: 0,
//         joined: ''
//       }
//     }
//   }

//   loadUser = (data) => {
//     this.setState({user: {
//       id: data.id,
//       name: data.name,
//       email: data.email,
//       entries: data.entries,
//       joined: data.joined
//     }})
//   }

//   calculateFaceLocation = (data) => {
//     const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
//     const image = document.getElementById('inputimage');
//     const width = Number(image.width);
//     const height = Number(image.height);
//     return {
//       leftCol: clarifaiFace.left_col * width,
//       topRow: clarifaiFace.top_row * height,
//       rightCol: width - (clarifaiFace.right_col * width),
//       bottomRow: height - (clarifaiFace.bottom_row * height)
//     }
//   }

//   displayFaceBox = (box) => {
//     this.setState({box: box});
//   }

//   onInputChange = (event) => {
//     this.setState({input: event.target.value});
//   }

//   onButtonSubmit = () => {
//     this.setState({imageUrl: this.state.input});
//     app.models
//       .predict(
//         Clarifai.FACE_DETECT_MODEL,
//         this.state.input)
//       .then(response => {
//         if (response) {
//           fetch('http://localhost:3000/image', {
//             method: 'put',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify({
//               id: this.state.user.id
//             })
//           })
//             .then(response => response.json())
//             .then(count => {
//               this.setState(Object.assign(this.state.user, { entries: count}))
//             })

//         }
//         this.displayFaceBox(this.calculateFaceLocation(response))
//       })
//       .catch(err => console.log(err));
//   }

//   onRouteChange = (route) => {
//     if (route === 'signout') {
//       this.setState({isSignedIn: false})
//     } else if (route === 'home') {
//       this.setState({isSignedIn: true})
//     }
//     this.setState({route: route});
//   }

//   render() {
//     const { isSignedIn, imageUrl, route, box } = this.state;
//     return (
//       <div className="App">
//          <Particles className='particles'
//           params={particlesOptions}
//         />
//         <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
//         { route === 'home'
//           ? <div>
//               <Logo />
//               <Rank
//                 name={this.state.user.name}
//                 entries={this.state.user.entries}
//               />
//               <ImageLinkForm
//                 onInputChange={this.onInputChange}
//                 onButtonSubmit={this.onButtonSubmit}
//               />
//               <FaceRecognition box={box} imageUrl={imageUrl} />
//             </div>
//           : (
//              route === 'signin'
//              ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
//              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
//             )
//         }
//       </div>
//     );
//   }
// }

// export default App;
