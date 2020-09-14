import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebaseConfig';

export const initializeLoginFramework = () => {
    if(firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }

}


export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();

   return firebase.auth().signInWithPopup(googleProvider)
      .then(res => {
        const { displayName, email, photoURL } = res.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photoURL: photoURL,
          success: true
        }
        return signedInUser;
      })
      .catch(err => {
        console.log(err);
        console.log(err.message);
      })
  }


  
export const handleFbLogin = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(fbProvider)
    .then( res =>{
      const token = res.credential.accessToken;
      const user = res.user;
      user.success = true;
      return user;
      
    }).catch( err =>{
        const errorCode = err.code
        const errorMessage = err.message
      console.log(errorCode, errorMessage);
    });
  }

  export const handleSignOut = () => {
   return firebase.auth().signOut()
      .then(res => {
        const signedOutUser = {
          isSignedIn: false,
          name: '',
          email: '',
          photoURL: '',
          error: '',
          success: false
        }
        return signedOutUser;

      })
      .catch(err => console.log(err))
  }


  export const createUserWithEmailAndPassword = (name, email, password) => {

    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(res => {
        const newUserInfo = res;
        newUserInfo.error = '';
        newUserInfo.success = true;
        updateUserName(name); 
        return newUserInfo;
    })
    .catch(error => {
        // Handle Errors here.
        const newUserInfo = {};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        return newUserInfo;
    })
  }


  export const signInWithEmailAndPassword = (email, password) => {
   return firebase.auth().signInWithEmailAndPassword(email, password)
    .then((res) => {
      const newUserInfo = res.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
        return newUserInfo;

    })
    .catch(error => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
  }

  const updateUserName = name => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name,
    
    }).then(function() {
      console.log('user name updated successfully');
    }).catch(error =>{
      // An error happened.
      console.log(error)
    });
  }