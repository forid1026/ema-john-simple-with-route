import React, { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { createUserWithEmailAndPassword, handleFbLogin, handleGoogleSignIn, handleSignOut, initializeLoginFramework, signInWithEmailAndPassword } from './LoginManager';


function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photoURL: ''
  })
  initializeLoginFramework();

  const [ loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
    handleGoogleSignIn()
    .then(res => {
     handleResponse(res, true)
    })
    
  }
  const fbSignIn = () => {
    handleFbLogin()
    .then(res => {
      handleResponse(res, true);
    })

  }
  const signOut = () => {
    handleSignOut()
    .then(res => {
      handleResponse(res, false)
    })
  }

  const handleResponse = (res, redirect) => {
      setUser(res);
      setLoggedInUser(res);
      history.replace(from);
  }

  const handleSubmit = (event) => {
    if( newUser && user.email  && user.password){
      createUserWithEmailAndPassword(user.name, user.email, user.password)
      .then(res =>{
        handleResponse(res, true)
      })
       
    }
    if(!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password)
      .then(res => {
       handleResponse(res, true)
      })
    }
    event.preventDefault();

  }
  const handleBlur = (event) => {
    let isFieldValid = true;
    if(event.target.name === 'email')
       isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
    if(event.target.name === 'password'){
      const validatePassword = event.target.value.length > 6;
      const validHasNumber = /\d{2}/.test(event.target.value);
      isFieldValid = validatePassword  && validHasNumber;

    } 
    if(isFieldValid){
      const newUserInfo = {...user};
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  }
  
  return (
    <div style={{textAlign: 'center', marginTop: '5px'}}>
      {
        user.isSignedIn ?
          <button onClick={signOut}>Sign out</button>
          :
          <button onClick={googleSignIn}>Sign in</button>
      }
      <br/>
      {
        <button onClick={fbSignIn}>Sign in With Facebook</button>
      }
      {
        user.isSignedIn &&
        <div className="userInfo">
          <p>Welcome, {user.name}</p>
          <p>Your Email : {user.email}</p>
          <img src={user.photoURL} alt="" />
        </div>
      }
      <h1>Our own authentication</h1>
      <input type="checkbox" name="newUser" onChange={()=> setNewUser(!newUser)} id=""/>
        <label htmlFor="newUser">New User Sign up</label>
      <form onSubmit={handleSubmit}>
       { newUser && <input type="text" name="name" onBlur={handleBlur}placeholder="Your Name"/>}
        <br/>
        <input type="text" onBlur={handleBlur} name="email" placeholder="Enter Email Address" required/>
        <br/>
        <input type="password" onBlur={handleBlur} name="password" placeholder="Your Password" required/>
        <br/>
        <input type="submit" value={newUser ? 'Submit' : 'Sign in'}/>
      </form>
      <p style={{color: 'red'}}>{user.error}</p>
      {user.success && <p style={{color: 'green'}}>{newUser ? 'Created' : 'Logged In'} { newUser ?'Account' : ''} Successfully </p>}

    </div>
  );
 }
export default Login;
