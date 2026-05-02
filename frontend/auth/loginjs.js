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

  // --- AUTH ---
window.signUp = async () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (err) {
    document.getElementById('auth-error').textContent = err.message;
  }
};

window.login = async () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    document.getElementById('auth-error').textContent = err.message;
  }
};

window.logout = async () => {
  await signOut(auth);
};

// --- AUTH STATE ---
onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById('auth-section').style.display = 'none';
    document.getElementById('app-section').style.display = 'block';
    document.getElementById('user-email').textContent = user.email;
    loadPosts();
  } else {
    document.getElementById('auth-section').style.display = 'block';
    document.getElementById('app-section').style.display = 'none';
  }
});

// --- POSTS ---
window.submitPost = async () => {
  const title = document.getElementById('post-title').value;
  const body = document.getElementById('post-body').value;
  const user = auth.currentUser;

  if (!title || !body) return alert('Please fill in all fields!');

  await addDoc(collection(db, 'posts'), {
    title,
    body,
    email: user.email,
    createdAt: serverTimestamp()
  });

  document.getElementById('post-title').value = '';
  document.getElementById('post-body').value = '';
};

function loadPosts() {
  const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
  onSnapshot(q, (snapshot) => {
    const list = document.getElementById('posts-list');
    list.innerHTML = '';
    snapshot.forEach(doc => {
      const p = doc.data();
      list.innerHTML += `
        <div class="post">
          <strong>${p.title}</strong>
          <p>${p.body}</p>
          <small>Posted by ${p.email}</small>
        </div>
      `;
    });
  });
}