const alertBtn = document.getElementById("alert");
const alertDialog = document.getElementById("alertDialog");
const okBtn = document.getElementById("okBtn");

const confirmBtn = document.getElementById("confirm");
const confirmDialog = document.getElementById("confirmDialog");
const cancelBtn = document.getElementById("cancelBtn");
const confirmBtn2 = document.getElementById("confirmBtn");
const output = document.getElementById("result");

const promptBtn = document.getElementById("prompt");
const promptDialog = document.getElementById("promptDialog");
const cancelBtn2 = document.getElementById("cancelBtn2");
const okBtn2 = document.getElementById("okBtn2");

alertBtn.addEventListener("click", function onOpen() {
    if( typeof alertDialog.showModal === "function"){
        alertDialog.showModal();

    }
    else {
        alert("The <dialog> API is not supported by this browser");
    }
});

okBtn.addEventListener("click", () =>{
    alertDialog.close();
})

confirmBtn.addEventListener("click", function onOpen() {
    if( typeof confirmDialog.showModal === "function"){
        confirmDialog.showModal();
        
    }
    else {
        alert("The <dialog> API is not supported by this browser");
    }
});

cancelBtn.addEventListener("click", () =>{
    output.innerHTML = "Confirm Result: False";
    confirmDialog.close();
})

confirmBtn2.addEventListener("click", () =>{
    output.innerHTML = "Confirm Result: True";
    confirmDialog.close();
})



promptBtn.addEventListener("click", function onOpen() {
    if( typeof promptDialog.showModal === "function"){
        promptDialog.showModal();
    }
    else {
        alert("The <dialog> API is not supported by this browser");
    }
});

cancelBtn2.addEventListener("click", () =>{
    let text = document.getElementById("input");
    output.innerHTML = "Prompt Result: The user hit cancel";
    promptDialog.close();
})

okBtn2.addEventListener("click", () =>{
    let text = document.getElementById("input");
    if(text.value == null || text.value.length==0){
        text = "The User did not enter anything";
        output.innerHTML = "Prompt Result: " + text;
    }
    else{
        let clean = DOMPurify.sanitize(text.value);
        output.innerHTML = "Prompt Result: " + clean;
    }

    promptDialog.close();
})

