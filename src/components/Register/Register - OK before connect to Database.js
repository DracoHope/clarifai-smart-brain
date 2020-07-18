import React from 'react';

// class Register extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       email: '',
//       password: '',
//       name: ''
//     }
//   }

//   onNameChange = (event) => {
//     this.setState({name: event.target.value})
//   }

//   onEmailChange = (event) => {
//     this.setState({email: event.target.value})
//   }

//   onPasswordChange = (event) => {
//     this.setState({password: event.target.value})
//   }

//   onSubmitSignIn = () => {
//     fetch('http://localhost:3000/register', {
//       method: 'post',
//       headers: {'Content-Type': 'application/json'},
//       body: JSON.stringify({
//         email: this.state.email,
//         password: this.state.password,
//         name: this.state.name
//       })
//     })
//       .then(response => response.json())
//       .then(user => {
//         if (user) {
//           this.props.loadUser(user)
//           this.props.onRouteChange('home');
//         }
//       })
//   }

//   render() {
//     return (
//       <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
//         <main className="pa4 black-80">
//           <div className="measure">
//             <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
//               <legend className="f1 fw6 ph0 mh0">Register</legend>
//               <div className="mt3">
//                 <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
//                 <input
//                   className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
//                   type="text"
//                   name="name"
//                   id="name"
//                   onChange={this.onNameChange}
//                 />
//               </div>
//               <div className="mt3">
//                 <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
//                 <input
//                   className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
//                   type="email"
//                   name="email-address"
//                   id="email-address"
//                   onChange={this.onEmailChange}
//                 />
//               </div>
//               <div className="mv3">
//                 <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
//                 <input
//                   className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
//                   type="password"
//                   name="password"
//                   id="password"
//                   onChange={this.onPasswordChange}
//                 />
//               </div>
//             </fieldset>
//             <div className="">
//               <input
//                 onClick={this.onSubmitSignIn}
//                 className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
//                 type="submit"
//                 value="Register"
//               />
//             </div>
//           </div>
//         </main>
//       </article>
//     );
//   }
// }


    const Register = ({onRouteChange}) => {
    //const { onRouteChange } = this.props;
    return (

// Sometime when we copied some HTML coe and paste it into javascript file and find out there is Error
// This is just because the Javascript is using the JSX inorder to incoporate HTML Tag into Javascript
// Therefore some of the HTML which not necessary need to be close in normal HTML file 
// But it is require to closed in the Javascript file
// For example for this case if the <input> Tag which copy from the Tachyons Sign In form 
// Reference: https://tachyons.io/components/forms/sign-in/index.html
// Just need to close all <input> Tag will solve the error problem

// Another Majr changes need to be done if we are using the Tachyons 
// is to change all "class" to "className" in order to use the Tachyons functions.

      // This article Tag contain the Tashyons Product Card Syntax just simply copy this article tag 
      // and place it whereever we want to be a Product card and remember to close <article/>
      // Reference: https://tachyons.io/components/cards/product-card/index.html
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Register</legend>

              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="name"
                  id="name"
                />
              </div>

              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                // {/* We need to change the 'route' to 'home' when we click the 'SingnIn' button */}
                // {/* We are passing in a "route" parameter into the onRouteChange Function */}
                // {/* There is another problem here. We do not want the onRouteChange function to be execute when this page is been render */}
                // {/* Instead we only want the OnRouteChange function to be execute only when we click the "SignOut" */}
                // { To do that we just use the Arrow function to treat this OnRouteChange as a local function only to be exected when someone click on the SignOut}
                // {/* By "{() => onRouteChange('home')}" this we are actually defining a function */}
                // {/* By doing this is to prevent this "onRouteChange('home')" is execute when this page id=s been render */}
                // {/* We only want the "onRouteChange('home')" to be executed only when the "Onclick" Event is Triggered */}
                onClick={() => onRouteChange('home')}
                
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Register"
              />
            </div>
          </div>
        </main>
      </article>
    );
  }


export default Register;