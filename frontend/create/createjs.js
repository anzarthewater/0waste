import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";

import {
 getAuth,
  onAuthStateChanged, 
  signOut,
  createUserWithEmailAndPassword,
  connectAuthEmulator,
  updateProfile,
  sendEmailVerification
} from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js';

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDB-75ye1J71GxZFH2Gt1bBG89sNNVIey8",
    authDomain: "ripnines-b7119.firebaseapp.com",
    projectId: "ripnines-b7119",
    storageBucket: "ripnines-b7119.firebasestorage.app",
    messagingSenderId: "541327244207",
    appId: "1:541327244207:web:2502bfb6ddfa1d25a6cd5a"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  
    //___________________________________________
    

      
    //___________________________________________

  
    function emailVeri() {
   sendEmailVerification(auth.currentUser)
    .then(() => {
  
    });

  }
  
   function signUpEmail(email,password) {
  
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    
    var user = userCredential.user;
      updateProfile(user, {displayName: document.getElementById("name").value})
    
    emailVeri()
    localStorage.setItem('email', document.getElementById('email').value); 
    window.location.href = 'https://zerowaste-frontend.onrender.com/auth/verify';

    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.error('Error signing in:', errorCode, errorMessage); 
    var errorfortext = errorCode.replace("auth/", "").replace("-", " ");
    document.getElementById('error').style.color = "#E81818";
    document.getElementById('error').textContent = errorfortext;
  });
  
  }
  

    
  //___________________________________________
  
  document.getElementById('signbutton').onmousedown = function() {
  
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  
  signUpEmail(email, password);
  
};
  
  

  
  
  
  
  