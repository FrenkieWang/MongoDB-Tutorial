var moduleFrom = document.getElementById('moduleForm');

document.addEventListener('DOMContentLoaded', function() {
    refreshModules(); // Refresh Modules when Browser loaded

    // [Path 1 - Get] -- Get all Modules - 'http://localhost:5000/modules/get'
    function refreshModules() {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:5000/modules/get', true);
        xhr.send();
        xhr.onerror = function() {
            console.error('Network error');
        };
        xhr.onload = function() {
            if (this.status >= 200 && this.status < 300) {
                const moduleList = document.getElementById('moduleList');
                moduleList.innerHTML = ''; // Clear Module Table

                const modules = JSON.parse(this.responseText); // String -> JSON
                console.log(modules); 
                // Create every Table Row in <tbody id="moduleList">
                modules.forEach(currentModule => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${currentModule._id.toString()}</td> 
                        <td>${currentModule.code}</td>
                        <td>${currentModule.moduleName}</td> 
                    `;
                    moduleList.appendChild(tr);
                });
            }else{
                console.log('Failed to fetch Modules:', this.statusText);
            }
        };
    }

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

}); // End of Load Page