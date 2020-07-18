import React from 'react';

// ***********************************************
// Tutor Working code
// const Navigation = ({ onRouteChange, isSignedIn }) => {
//     if (isSignedIn) {
//       return (
//         <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
//           <p onClick={() => onRouteChange('signout')} className='f3 link dim black underline pa3 pointer'>Sign Out</p>
//         </nav>
//       );
//     } else {
//       return (
//         <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
//           <p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>Sign In</p>
//           <p onClick={() => onRouteChange('register')} className='f3 link dim black underline pa3 pointer'>Register</p>
//         </nav>
//       );
//     }
// }
// ***********************************************

// const Navigation = () => {
//   return (
//       <nav style={{display: 'flex', justifyContent:'flex-end'}}>
//           <p  className='f3 link dim black underline pa3 pointer'>Sign In</p>
//           <p  className='f3 link dim black underline pa3 pointer'>Register</p>
//       </nav>
//     );
//   }


const Navigation = ({onRouteChange, isSignedIn}) => {
    if (isSignedIn) {
      return(
      <nav style={{display: 'flex', justifyContent:'flex-end'}}>
          {/* We are passing in a "route" parameter into the onRouteChange Function */}
          {/* There is another problem here. We do not want the onRouteChange function to be execute when this page is been render */}
          {/* Instead we only want the OnRouteChange function to be execute only when we click the "SignOut" */}
          {/* To do that we just use the Arrow function to treat this OnRouteChange as a local function only to be exected when someone click on the SignOut*/}
          <p  onClick={() => onRouteChange('signout')} className='f3 link dim black underline pa3 pointer'>Sign Out</p>
      </nav>
      );
    } else {
      return (
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
          <p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>Sign In</p>
          <p onClick={() => onRouteChange('register')} className='f3 link dim black underline pa3 pointer'>Register</p>
        </nav>
      );
    }
    //);
  }

export default Navigation