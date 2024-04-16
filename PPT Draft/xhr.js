let xhr = new XMLHttpRequest();

xhr.open(HTTPMethod, URL, true);

xhr.setRequestHeader('Content-Type', 'application/json'); 

xhr.send(Requestbody);      

xhr.onerror = function() {
    console.error('Network error');
};     

xhr.onload = function() {
    if (this.status >= 200 && this.status < 300) 
        // What is executed after a successful HTTP request.
        console.log('New Module created successfully');
    else {
        console.log('Failed to Create a Module:', this.statusText);
    }
};


document.addEventListener('DOMContentLoaded', function() {
    refreshModules(); // Refresh Modules when Browser loaded

    function refreshModules() {
        // XMLHTTPRequest - Get all Modules
    }

    document.getElementById('createModuleButton')
        .addEventListener('click', function(event) {
            event.preventDefault(); 

        // 1 - Fetch all Data in Form

        // 2 - XMLHTTPRequest - Create a Module
            // If created successfully -> refreshModules()；

    });      

}); // End of Load Page