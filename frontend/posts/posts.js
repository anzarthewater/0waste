import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js"
import { getFirestore , collection, addDoc, query, where, getDocs  } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js"
import { getAuth } from 'firebase/auth';

// Firebase configuration
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

// Create a new post
export const createPost = async (postContent) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('User must be authenticated to create a post');
    }

    const docRef = await addDoc(collection(db, 'posts'), {
      username: user.displayName || user.email,
      userId: user.uid,
      content: postContent,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return docRef.id;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

// Get all posts
export const getAllPosts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'posts'));
    const posts = [];
    querySnapshot.forEach((doc) => {
      posts.push({ id: doc.id, ...doc.data() });
    });
    return posts.sort((a, b) => b.createdAt - a.createdAt);
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

// Get posts by username
export const getPostsByUsername = async (username) => {
  try {
    const q = query(collection(db, 'posts'), where('username', '==', username));
    const querySnapshot = await getDocs(q);
    const posts = [];
    querySnapshot.forEach((doc) => {
      posts.push({ id: doc.id, ...doc.data() });
    });
    return posts.sort((a, b) => b.createdAt - a.createdAt);
  } catch (error) {
    console.error('Error fetching posts by username:', error);
    throw error;
  }
};

// Get posts by user ID
export const getPostsByUserId = async (userId) => {
  try {
    const q = query(collection(db, 'posts'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    const posts = [];
    querySnapshot.forEach((doc) => {
      posts.push({ id: doc.id, ...doc.data() });
    });
    return posts.sort((a, b) => b.createdAt - a.createdAt);
  } catch (error) {
    console.error('Error fetching posts by user ID:', error);
    throw error;
  }
};

export { auth, db };
