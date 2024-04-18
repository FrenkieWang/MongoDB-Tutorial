// [Path 2 - POST] -- Create a Module - 'http://localhost:5000/modules/create'
document.getElementById('createModuleButton').addEventListener('click', function(event) {
    event.preventDefault(); 

    // Populate `module` Object with the content of <form>
    var formData = new FormData(moduleForm);
    var module = {};
    formData.forEach(function(value, name) {
        module[name] = value;
    });
    console.log(module); 

    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:5000/modules/create', true);
    xhr.setRequestHeader('Content-Type', 'application/json'); // Data Type to be sent: JSON   
    xhr.send(JSON.stringify(module));  // JSON -> String    
    xhr.onerror = function() {
        console.error('Network error');
    };     
    xhr.onload = function() {
        if (this.status >= 200 && this.status < 300) {
            refreshModules(); // Refresh <table> after CREATE
            console.log('New Module Created successfully');
        } else {
            console.log('Failed to Create a Module:', this.statusText);
        }
    };
});    