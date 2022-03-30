import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js"
import {collection, addDoc} from 'https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js'

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

        var db = firebase.firestore();
var index;
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

function addBlog(){

    var title = document.getElementById("inputTitle");
    var date = document.getElementById("inputDate");
    var summary = document.getElementById("inputSummary");
    alert("adding");
    try {
        const docRef = await addDoc(collection(db, "blogs"), {
            title: title.value,
            date: date.value,
            summary: summary.value
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    // db.collection("blogs").add({
    //     title: title.value,
    //     date: date.value,
    //     summary: summary.value
    // }).then((docRef) => {
    //     console.log("Document written with ID: ", docRef.id);
    // })
    // .catch((error) => {
    //     console.error("Error adding document: ", error);
    // });
    let blogPost = {title: title.value, date: date.value, summary: summary.value};
    //let blogPost = {title: "title", date: "date", summary: "summary"};
    
    blogs.push(blogPost);
    localStorage.setItem("blogs", JSON.stringify(blogs));
    title ='';
    date = '';
    summary = '';
}

readAll();

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
 saveBtn.addEventListener("click", addBlog);

 for(let i = 0; i< blogs.length; i++){
     const delBtn =  document.getElementById("delete" + i);
     delBtn.addEventListener("click", ()=>{
        alert("deleting");
        console.log(blogs[i]);
        deleteBlog(blogs[i]);
     })
 }

 for(let i = 0; i< blogs.length; i++){
    const updateBtn =  document.getElementById("update" + i);
    updateBtn.addEventListener("click", ()=>{
       alert("updating");
       //console.log(blogs[i]);
       editBlog(blogs[i]);

    })
}

    function readAll(){
        if(blogs.length >0){
            for(let i = 0; i<blogs.length; i++){
                        let el = document.createElement('p');
                        el.setAttribute("id", "elem" + i);
                        let deleteBtn = document.createElement('button');
                        deleteBtn.setAttribute("id", "delete" + i);
                        deleteBtn.setAttribute("class", "crudBtns");
                        let updateBtn = document.createElement('button');
                        updateBtn.setAttribute("id", "update" + i);
                        updateBtn.setAttribute("class", "crudBtns");
                        let deleteText = document.createTextNode('Delete');
                        let updateText = document.createTextNode('Update');
                        let text = document.createTextNode("Title: " + blogs[i].title + " - Date: " + blogs[i].date + " - Summary: " + blogs[i].summary );
                        el.appendChild(text);
                    
                        deleteBtn.appendChild(deleteText);
                        el.appendChild(deleteBtn);
                    
                        updateBtn.appendChild(updateText);
                        el.appendChild(updateBtn); 
                    
                        document.getElementById("blogs").appendChild(el);
                
            }
             
        }

    }

    function deleteBlog(blog){
        for(let i = 0; i<blogs.length; i++){
            if(blogs[i] != null){
                if(blogs[i].title == blog.title && blogs[i].date == blog.date && blogs[i].summary == blog.summary){
                    const row = document.getElementById("elem" + i);
                    row.remove();
                    blogs.splice(i,1);
                }
            }
        }
       localStorage.setItem("blogs", JSON.stringify(blogs));
        //console.log(blogs);
    }

    const updateDialog = document.getElementById("updateDialog");
    const cancelBtn1 = document.getElementById("cancelBtn");
    const saveUpdateBtn = document.getElementById("updateBtn");

    saveUpdateBtn.addEventListener("click", ()=>{
        updateBlogArray(index);
    });

    function editBlog(blog){
        updateDialog.showModal();
        
        for(let i =0; i<blogs.length; i++){
            if(blogs[i].title == blog.title && blogs[i].date == blog.date && blogs[i].summary == blog.summary){
                index = i;
            }
        }
        console.log(index);
        var title = document.getElementById("inputTitle1");
        title.value = blog.title;
        var date = document.getElementById("inputDate1");
        date.value = blog.date;
        var summary = document.getElementById("inputSummary1");
        summary.value = blog.summary;
        
    }

    function updateBlogArray(index){
        var title = document.getElementById("inputTitle1");
        var date = document.getElementById("inputDate1");
        var summary = document.getElementById("inputSummary1");
        if(blogs[index].title != title.value){
            console.log(blogs[index].title);
            console.log(title.value);
            blogs[index].title = title.value;
        }
        if(blogs[index].date != date.value){
            blogs[index].date = date.value;
        }
        if(blogs[index].summary != summary.value){
            blogs[index].summary = summary.value;
        }
        localStorage.setItem("blogs", JSON.stringify(blogs));
        //console.log(blogs);
    }
    //console.log(blogs)
  


