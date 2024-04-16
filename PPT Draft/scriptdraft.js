document.addEventListener('DOMContentLoaded', function() {

    document.getElementById('createModuleButton')
        .addEventListener('click', function(event) {
            event.preventDefault(); 

            // Put Form Data into Module

            // XMLHTTPRequest - Create
    });
    
});


document.addEventListener('DOMContentLoaded', function() {

    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:5000/modules/create', true);
    xhr.setRequestHeader('Content-Type', 'application/json');  
    xhr.send(JSON.stringify(module));      
    xhr.onerror = function() {
        console.error('Network error');
    };     
    xhr.onload = function() {
        if (this.status >= 200 && this.status < 300) {
            refreshModules(); 
            console.log('New Module Created successfully');
        } else {
            console.log('Failed to Create a Module:', this.statusText);
        }
    };







    refreshModules();

    function refreshModules() {
        // ......
    }
});


function refreshModules() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:5000/modules/get', true);
    xhr.send();
    xhr.onerror = function() {
        console.error('Network error');
    };
    xhr.onload = function() {
        if (this.status >= 200 && this.status < 300) {
            // ...........Render Modules
        }else{
            console.log('Failed to fetch Modules:', this.statusText);
        }
    };
}

document.addEventListener('DOMContentLoaded', function() {
    refreshModules();

    function refreshModules() {
        // XMLJHttpRequest - Get All
    }
});