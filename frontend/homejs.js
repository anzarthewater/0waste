import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";


import {
 getAuth,
  onAuthStateChanged, 
  signOut,
  connectAuthEmulator
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
  const db = getFirestore(app);
  
//------------------------------------

var profilelink;
//------------------------------------
  auth.onAuthStateChanged((user) => {
	if (user)  {
   var uid = user.uid;
   var profilelink = "https://ripnines.github.io/account/profile"
   if (user.displayName) {
    document.getElementById('signin').textContent = user.displayName;
   } else {
    document.getElementById('signin').textContent = "Name";
   }
  
  } else {
  console.log("not signedin")
  var profilelink = "https://ripnines.github.io/account/signin"
  document.getElementById('signin').textContent = "Sign In";
  }

});

document.getElementById('signin').onclick = function() {
localStorage.setItem('link', window.location.href); 
window.location.replace(profilelink);
}
  
  
  