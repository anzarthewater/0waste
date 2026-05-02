import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js"
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js"

import {
  getAuth,
  onAuthStateChanged,
  updateProfile,
  connectAuthEmulator,
  signOut
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDB-75ye1J71GxZFH2Gt1bBG89sNNVIey8",
  authDomain: "ripnines-b7119.firebaseapp.com",
  projectId: "ripnines-b7119",
  storageBucket: "ripnines-b7119.firebasestorage.app",
  messagingSenderId: "541327244207",
  appId: "1:541327244207:web:2502bfb6ddfa1d25a6cd5a",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

//------------------------------------------------

function errors(text) {
    document.getElementById("error").style.color = "#E81818";
    document.getElementById("error").textContent = text;
    console.error(text);
}

function errorsreset(){
    document.getElementById("error").style.color = "#020B0D";
    document.getElementById("error").textContent = "";
}

//------------------------------------------------

 function updateprofile(user) {
    updateProfile(user, {displayName: document.getElementById("name").value})
    .then(() => {
        var displayName = user.displayName;
        document.getElementById("name").textContent = displayName;
    }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        errors("Error signing in:", errorCode, errorMessage);
    });
}
//------------------------------------------------
auth.onAuthStateChanged((user) => {
  if (user) {
    document.getElementById("name").value = user.displayName;

window.updateprofile = function () {
updateprofile(user)
}
   
  } else {
 errors("not signed in")
 localStorage.setItem("link", window.location.href);
  window.location.href ="https://ripnines.github.io/account/signin";
  }
  
})

 document.getElementById("finish").onmousedown = function () {
      updateprofile(auth.currentUser);
     var link = localStorage.getItem('link');
     if (link) {
     var linkRightNow = link;
    localStorage.removeItem('link');
      window.location.href = link
     } else {
        window.location.href = "https://ripnines.github.io/"
     }
  
}
    
     document.getElementById("signout").onmousedown = function () {
     signOut(auth);
     var link = localStorage.getItem('link');
    var linkRightNow = link;
    localStorage.removeItem('link');
      window.location.href = "https://ripnines.github.io/account/signin";
    }