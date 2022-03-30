import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
        import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js";
        import {
        connectAuthEmulator,
        signInWithEmailAndPassword,
        onAuthStateChanged, 
        signOut
        } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js"
       
        const firebaseConfig = {
        apiKey: "AIzaSyCR2HSfyjxqMwO8KDDA1Bk1KjbEMD2_nZY",
        authDomain: "cse134b-hw5-beab9.firebaseapp.com",
        projectId: "cse134b-hw5-beab9",
        storageBucket: "cse134b-hw5-beab9.appspot.com",
        messagingSenderId: "181886878266",
        appId: "1:181886878266:web:1c733c49f73dff159beb03",
        measurementId: "G-7Y1Q3L9DP1"
        };


        // Initialize Firebase
        const app = initializeApp(firebaseConfig);


        // Initialize Firebase Authentication and get a reference to the service
        const auth = getAuth(app);

        //const loginForm = document.getElementById("loginForm");
        var form = document.getElementById("loginForm");
        function handleForm(event) { event.preventDefault(); } 
        form.addEventListener('submit', handleForm);
        const loginDialog = document.getElementById("loginDialog");
    


        //connectAuthEmulator(auth, "http://localhost:9099");
        const loginEmailPassword = async() =>{
        alert("checking")
        const email = document.getElementById("emailInput");
        const loginEmail = email.value;
        console.log(loginEmail);

        const password = document.getElementById("pwInput");
        const loginPassword = password.value;
            try{
                const userCred = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
                alert("user logged in");
            }catch(error){
                alert(error);
            }
        loginDialog.close()

        console.log(userCred.user);
        }

        var loginBtn2 = document.getElementById("loginBtn2");
        loginBtn2.addEventListener("click", loginEmailPassword);

        var logoutBtn = document.getElementById("logoutBtn");
        logoutBtn.addEventListener("click", () =>{
            signOut(auth);
            alert("Signed Out");
        })

        if(localStorage.getItem("blogs")==null){
            var blogs = [];
            for(let i = 0; i<5; i++){
            let blogPost = {title: 'Some Title' + i, 
                        date: '05/04/2020', 
                        summary: 'this is a summary'};
            blogs.push(blogPost);
        }
        }
        else{
            blogs = JSON.parse(localStorage.getItem("blogs"));
        }   

        onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            let addBlogBtn = document.getElementById("addBtn");
            addBlogBtn.style.visibility = "visible";
            let welcomePrompt = document.getElementById("loggedIn");
            welcomePrompt.style.visibility = "hidden";
            welcomePrompt.innerHTML = "Logged in as " + user.email;
            for(let i = 0; i<4; i++){
                // let deleteBtn = document.getElementById("delete" + i);
                // deleteBtn.style.visibility = "visible";
                // let updateBtn = document.getElementById("update" + i);
                // updateBtn.style.visibility = "visible";               
            }
            let loginBtn = document.getElementById("loginBtn");
            loginBtn.style.visibility = "hidden";
            let logoutBtn = document.getElementById("logoutBtn");
            logoutBtn.style.visibility = "visible";
            // ...
        } else {
            // User is signed out
            // ...
            let addBlogBtn = document.getElementById("addBtn");
            addBlogBtn.style.visibility = "hidden";
            for(let i = 0; i<4; i++){
                // let deleteBtn = document.getElementById("delete" + i);
                // console.log("hi")
                // deleteBtn.style.visibility = "hidden";
                // let updateBtn = document.getElementById("update" + i);
                // updateBtn.style.visibility = "hidden";
            }
            let loginBtn = document.getElementById("loginBtn");
            loginBtn.style.visibility = "visible";
            let logoutBtn = document.getElementById("logoutBtn");
            logoutBtn.style.visibility = "hidden";
            let welcomePrompt = document.getElementById("loggedIn");
            welcomePrompt.style.visibility = "hidden";

        }
        });

