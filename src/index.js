// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from 'firebase/app'
import {
    getFirestore,
    collection,
    getDocs,
    doc,
    addDoc,
    deleteDoc,
    onSnapshot,
    query,
    where,
    orderBy,
    serverTimestamp,
    getDoc,
    updateDoc
} from 'firebase/firestore'

import {
    getAuth,
    createUserWithEmailAndPassword,
    signOut,
    signInWithEmailAndPassword,
    onAuthStateChanged
} from 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyB4VkP7tUiXc9oTyELVMPjQVBijMmWwAdw",
    authDomain: "explore-idea.firebaseapp.com",
    projectId: "explore-idea",
    storageBucket: "explore-idea.appspot.com",
    messagingSenderId: "821902432144",
    appId: "1:821902432144:web:8b70defb84319e3e7a0515",
    measurementId: "G-XEWD82TP1M"
};

// init firebase app
initializeApp(firebaseConfig)

// init services
const db = getFirestore()
const auth = getAuth()


// collection ref
const colRef = collection(db, 'video')

// query
const q = query(colRef, where("ID", "==", "7"))
// const q = query(colRef, where("ID", "==", "7"), orderBy('title', 'asc'))

// get collection data
// getDocs(colRef)
//     .then((snapshot) => {
//         let videos = []
//         snapshot.docs.forEach((doc) => {
//             videos.push({ ...doc.data(), id: doc.id })
//         })
//         console.log(videos)
//     })
//     .catch(err => {
//         console.log(err.message)
//     })

// real time collection data
onSnapshot(q, (snapshot) => {
    let videos = []
    snapshot.docs.forEach((doc) => {
        videos.push({ ...doc.data(), id: doc.id })
    })
    console.log(videos)
})

// adding docs
const addVideoForm = document.querySelector('.add')
addVideoForm.addEventListener('submit', (e) => {
    e.preventDefault()

    addDoc(colRef, {
        category: addVideoForm.category.value,
        subCategory: addVideoForm.subCategory.value,
        ID: addVideoForm.ID.value,
        videoURL: addVideoForm.videoURL.value,
        videoID: addVideoForm.videoID.value,
        // publishedAt: addVideoForm.publishedAt.value,
        title: addVideoForm.title.value,
        description: addVideoForm.description.value,
        createdAt: serverTimestamp()
    })
        .then(() => {
            addVideoForm.reset()
        })
})

// deleting docs
const deleteVideoForm = document.querySelector('.delete')
deleteVideoForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const docRef = doc(db, 'video', deleteVideoForm.id.value)

    deleteDoc(docRef)
        .then(() => {
            deleteVideoForm.reset()
        })
})

// get a single document
const docRef = doc(db, 'video', '143UCwVGCEV4vB9Wycqz')

getDoc(docRef)
    .then((doc) => {
        console.log(doc.data(), doc.id)
    })

onSnapshot(docRef, (doc) => {
    console.log(doc.data(), doc.id)
})

// updating a document
const updateForm = document.querySelector('.update')
updateForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const docRef = doc(db, 'video', updateForm.id.value)
    updateDoc(docRef, {
        description: 'updated description'
    })
        .then(() => {
            updateForm.reset()
        })
})

// signing up user
const signupForm = document.querySelector('.signup')
signupForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const email = signupForm.email.value
    const password = signupForm.password.value
    createUserWithEmailAndPassword(auth, email, password)
        .then((credential) => {
            console.log("user created:", credential.user)
            signupForm.reset()
        })
        .catch((err) => {
            console.log(err.message)
        })
})

// logout
const logoutButton = document.querySelector('.logout')
logoutButton.addEventListener('click', () => {
    signOut(auth)
        .then(() => {
            // console.log("user signed out")
        })
        .catch((err) => {
            console.log(err.message)
        })
})

// login
const loginForm = document.querySelector('.login')
loginForm.addEventListener('submit', () => {
    console.log("login")
    const email = loginForm.email.value
    const password = loginForm.password.value
    signInWithEmailAndPassword(auth, email, password)
        .then((credential) => {
            // console.log("user signed in:", credential.user)
        })
        .catch((err) => {
            console.log(err.message)
        })
})

// subscribing to auth changes
onAuthStateChanged(auth, (user) => {
    console.log("user status changed:", user)
})