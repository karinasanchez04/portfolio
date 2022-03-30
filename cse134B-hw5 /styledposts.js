import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js"
import { getDatabase, ref, set, get, child, push, update, remove} from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-database.js'
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
        const database = getDatabase();
        


        const loginDialog = document.getElementById("loginDialog");
        var loginBtn = document.getElementById("loginBtn");
        var date = document.getElementById("inputDate");
        var date1 = document.getElementById("inputDate1");
        var fullDate = new Date();
        date.value = fullDate.getMonth()+1 + "/" + fullDate.getDate() + "/" + fullDate.getFullYear();
        date1.value = fullDate.getMonth()+1 + "/" + fullDate.getDate() + "/" + fullDate.getFullYear();
        var cancel2 = document.getElementById("cancelBtn2");
        cancel2.addEventListener("click",()=>{
            loginDialog.close();
        });
window.addEventListener('DOMContentLoaded', init);
function init(){
    readAll();
}
loginBtn.addEventListener("click", function onOpen(){
    if( typeof loginDialog.showModal === "function"){
        loginDialog.showModal();
    }
    else {
        alert("The <dialog> API is not supported by this browser");
    }
});


function addBlog(){

    var title = document.getElementById("inputTitle");
    var date = document.getElementById("inputDate");
    var summary = document.getElementById("inputSummary");
    var author = document.getElementById("inputAuthor");

    if(title.value.length!=0 && date.value.length != 0 && summary.value.length != 0){
    alert("adding");
    const newPostKey = push(child(ref(database), 'blogs')).key;
    set(ref(database, 'blogs/' + title.value), {
        title: title.value,
        summary: summary.value,
        author: author.value,
        date: date.value
    });

    }
    else{
        alert("You must fill out all fields")
    }
    title ='';
    date = '';
    summary = '';
    document.location.reload(true);
}



const addBtn = document.getElementById("addBtn");
const addDialog = document.getElementById("addDialog");
const cancelBtn = document.getElementById("cancelBtn");


addBtn.addEventListener("click", function onOpen(){
    if( typeof addDialog.showModal === "function"){
        addDialog.showModal();

    }
    else {
        alert("The <dialog> API is not supported by this browser");
    }
});


 //const form = document.querySelector("form");
 //form.addEventListener("submit", addBlog());

 const saveBtn = document.getElementById("saveBtn");
 saveBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    addBlog();
    addDialog.close();
 });

var count = 0;
    function readAll(){
        
        const dbRef = ref(getDatabase());
        get(child(dbRef, `blogs/`)).then((snapshot) => {
        if (snapshot.exists()) {
            snapshot.forEach(
                function(ChildSnapshot){
                    let title = ChildSnapshot.val().title;
                    let date = ChildSnapshot.val().date;
                    let author = ChildSnapshot.val().author;
                    let summary = ChildSnapshot.val().summary;
                    console.log(title);
                    addItems(title, summary, author,date, count);
                    count++;
                }
            );
        } else {
         console.log("No data available");
        }
        }).catch((error) => {
        console.error(error);
    });


    }

    function addItems(title, summary, author, date, count){
        let el = document.createElement('p');
        el.setAttribute("class", "blogs")
        let ul = document.createElement('ul');
        let liTitle = document.createElement('h2')
        let liSum = document.createElement('li');
        let liAuth = document.createElement('li');
        let liDate = document.createElement('li');
        let br = document.createElement('br');
        el.setAttribute("id", title);
        let deleteBtn = document.createElement('button');
        deleteBtn.setAttribute("id", "delete" + count);
        deleteBtn.setAttribute("class", "delete");
        let trashIcon = document.createElement("img");
        trashIcon.setAttribute("src", "./trashIcon.png");
        trashIcon.setAttribute("width", '10');

        let updateBtn = document.createElement('button');
        updateBtn.setAttribute("id", "update" + count);
        let deleteText = document.createTextNode('Delete');
        let updateText = document.createTextNode('Update');
        let updateIcon = document.createElement('img');
        updateIcon.setAttribute("src", "./editIcon.png");
        updateIcon.setAttribute("width", '10');
        let titleText = document.createTextNode("Title: " + title);
        let sumText = document.createTextNode("Content: " + summary);
        let authText = document.createTextNode("Author: " + author);
        let dateText = document.createTextNode("Date: " + date);
        liTitle.appendChild(titleText);
        liSum.appendChild(sumText);
        liAuth.appendChild(authText);
        liDate.appendChild(dateText);
        el.appendChild(ul);
        ul.appendChild(liTitle);
        ul.appendChild(liSum);
        ul.appendChild(liAuth);
        ul.appendChild(liDate);
        deleteBtn.appendChild(deleteText);
        deleteBtn.appendChild(trashIcon);
        el.appendChild(deleteBtn);

        updateBtn.appendChild(updateText);
        updateBtn.appendChild(updateIcon);
        el.appendChild(updateBtn); 

        document.getElementById("blogs").appendChild(el);

        const delBtn =  document.getElementById("delete" + count);
        delBtn.addEventListener("click", ()=>{
        //alert("deleting");
        
        deleteBlog(title);
     })

     
        const upBtn =  document.getElementById("update" + count);
        updateBtn.addEventListener("click", ()=>{
           //alert("updating");
           //console.log(blogs[i]);
           editBlog(title, date, summary, author);
    
        })
    
    }
    function deleteBlog(blog){
        console.log(blog);
        set(ref(database, 'blogs/' + blog), null);
        document.location.reload(true);
  
    }

    const updateDialog = document.getElementById("updateDialog");
    const cancelBtn1 = document.getElementById("cancelBtn");
    const saveUpdateBtn = document.getElementById("saveupdateBtn");

    saveUpdateBtn.addEventListener("click", (e)=>{
        e.preventDefault();

        var title = document.getElementById("inputTitle1");
        var date = document.getElementById("inputDate1");
        var summary = document.getElementById("inputSummary1");
        var author = document.getElementById("inputAuthor1");
        const newData = {
            title: title.value,
            summary: summary.value,
            author: author.value,
            date: date.value
        }
        console.log(date);
        const newPostKey = push(child(ref(database), 'blogs')).key;
        const updates = {};
        updates['/blogs/' + title.value] = newData;
   
        update(ref(database), updates);
        updateDialog.close();
        document.location.reload(true);
        //updateBlogArray(index);
    });

    function editBlog(title1, date1, summary1, author1){
        updateDialog.showModal();
        
        var title = document.getElementById("inputTitle1");
        title.value = title1;
        var date = document.getElementById("inputDate1");
        date.value = date1;
        var author = document.getElementById("inputAuthor1");
        author.value = author1;
        var summary = document.getElementById("inputSummary1");
        summary.value = summary1;
        
    }

    const auth = getAuth(app);

    //const loginForm = document.getElementById("loginForm");
    var form = document.getElementById("loginForm");
    function handleForm(event) { event.preventDefault(); } 
    form.addEventListener('submit', handleForm);
   



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

        //console.log(userCred.user);
    }

    var loginBtn2 = document.getElementById("loginBtn2");
    loginBtn2.addEventListener("click", loginEmailPassword);

    var logoutBtn = document.getElementById("logoutBtn");
    logoutBtn.addEventListener("click", () =>{
        signOut(auth);
        alert("Signed Out");
    })

    onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var author = document.getElementById("inputAuthor");
        author.value = user.email;
        var author1 = document.getElementById("inputAuthor1");
        author1.value = user.email;
        let addBlogBtn = document.getElementById("addBtn");
        addBlogBtn.style.visibility = "visible";
        let welcomePrompt = document.getElementById("loggedIn");
        welcomePrompt.style.visibility = "visible";
        welcomePrompt.innerHTML = "Logged in as " + user.email;
        for(let i = 0; i<count; i++){
            let deleteBtn = document.getElementById("delete" + i);
            deleteBtn.style.visibility = "visible";
            let updateBtn = document.getElementById("update" + i);
            updateBtn.style.visibility = "visible";               
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
        for(let i = 0; i<count; i++){
            let deleteBtn = document.getElementById("delete" + i);
            console.log("hi")
            deleteBtn.style.visibility = "hidden";
            let updateBtn = document.getElementById("update" + i);
            updateBtn.style.visibility = "hidden";
        }
        let loginBtn = document.getElementById("loginBtn");
        loginBtn.style.visibility = "visible";
        let logoutBtn = document.getElementById("logoutBtn");
        logoutBtn.style.visibility = "hidden";
        let welcomePrompt = document.getElementById("loggedIn");
        welcomePrompt.style.visibility = "hidden";

    }
    });