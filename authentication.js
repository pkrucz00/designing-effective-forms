// Import the functions you need from the SDKs you need
import { initializeApp,  } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCuEK3yacxeOtWvDmTnolIynoN_cMraXhk",
  authDomain: "tpf-laby.firebaseapp.com",
  projectId: "tpf-laby",
  storageBucket: "tpf-laby.firebasestorage.app",
  messagingSenderId: "190793652251",
  appId: "1:190793652251:web:a95f2a4cf080c8202380be"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const provider = new GoogleAuthProvider();

const signInButton = document.querySelector("#signInButton");
const signOutButton = document.querySelector("#signOutButton");

const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const emailInput = document.getElementById("exampleInputEmail1");

const injectValueToElement = (element, value) => {
    if (element) {
        element.value = value;
    }
}

const fillInfo = (user) => {
    const displayName = user.displayName;
    const [firstName, lastName] = displayName.split(' ');
    const email = user.email;

    console.log({firstName, lastName, email});

    injectValueToElement(firstNameInput, firstName);
    injectValueToElement(lastNameInput, lastName);
    injectValueToElement(emailInput, email);
}

const userSignIn = async () => {
    signInWithPopup(auth, provider).then((result) => {
        const user = result.user;
        fillInfo(user);
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error({errorCode, errorMessage});
    })
 };

 const userSignOut = async () => {
    signOut(auth).then(() => {
        alert("You have been signed out!")
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error({errorCode, errorMessage});
    })
 }

 onAuthStateChanged(auth, (user) => {
    if (user) {
        alert("You are authenticated with Google");
        
        fillInfo(user);
    }
 })
 
 signInButton.addEventListener("click", userSignIn);
signOutButton.addEventListener("click", userSignOut);
 
