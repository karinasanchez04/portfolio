(function(){
    var xhr;
    var date = document.getElementById("date");
    var fullDate = new Date();
    date.value = fullDate.getMonth()+1 + "/" + fullDate.getDate() + "/" + fullDate.getFullYear();
    
    document.getElementById("postBtn").addEventListener('click', makePostRequest);
    function makePostRequest(){
        var formElem = document.querySelector("form");
        var formData = new FormData(formElem);
        xhr = new XMLHttpRequest();
        var message;
        if(!xhr){
            alert("Something went wrong");
            return false;
        }
        xhr.open('POST', 'https://httpbin.org/post');
        xhr.onload = (res) =>{
            message = res['target']['response'];
            var responseOutput = document.getElementById("response");
            responseOutput.innerHTML = message;
        }
        xhr.send(formData);

        // function handleResponse(xhr){
        //     var parsedResponse = xhr.responseXML;
        //     console.log(parsedResponse);
        //     var responseOutput = document.getElementById("response");
        //     responseOutput.innerHTML = parsedResponse;
        // }
        

    }
    document.getElementById("getBtn").addEventListener('click', makeGetRequest);
    function makeGetRequest(){
        var formElem = document.querySelector("form");
        var formData = new FormData(formElem);
        xhr = new XMLHttpRequest();
        var message;
        if(!xhr){
            alert("Something went wrong");
            return false;
        }
        xhr.open('GET', 'https://httpbin.org/get');
        xhr.onload = (res) =>{
            message = res['target']['response'];
            var responseOutput = document.getElementById("response");
            responseOutput.innerHTML = message;
        }
        xhr.send(formData);
        
        // function handleResponse(xhr){
        //     var parsedResponse = xhr.responseXML;
        //     //var msg = parsedResponse.getElementsByTagName('message')[0].firstChild.nodeValue;
        //     console.log("hi");
        //     var responseOutput = document.getElementById("response");
        //     responseOutput.innerHTML = parsedResponse;
        // }
    }

    document.getElementById("putBtn").addEventListener('click', makePutRequest);
    function makePutRequest(){
        var formElem = document.querySelector("form");
        var formData = new FormData(formElem);
        xhr = new XMLHttpRequest();
        var message;
        if(!xhr){
            alert("Something went wrong");
            return false;
        }
        xhr.open('PUT', 'https://httpbin.org/put');
        xhr.onload = (res) =>{
            message = res['target']['response'];
            var responseOutput = document.getElementById("response");
            responseOutput.innerHTML = message;
        }
        xhr.send(formData);
    }

    document.getElementById("deleteBtn").addEventListener('click', makeDeleteRequest);
    function makeDeleteRequest(){
        var formElem = document.querySelector("form");
        var formData = new FormData(formElem);
        xhr = new XMLHttpRequest();
        var message;
        if(!xhr){
            alert("Something went wrong");
            return false;
        }
        xhr.open('DELETE', 'https://httpbin.org/delete');
        xhr.onload = (res) =>{
            message = res['target']['response'];
            var responseOutput = document.getElementById("response");
            responseOutput.innerHTML = message;
        }
        xhr.send(formData);
    }
})();