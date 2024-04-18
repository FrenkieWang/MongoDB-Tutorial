document.addEventListener('DOMContentLoaded', function() {
    var currentEditingModuleId = null; // Make sure to edit only one module
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
                        <td>
                            <a href="#" onclick="editModule('${currentModule._id.toString()}')">edit</a> | 
                            <a href="#" onclick="deleteModule('${currentModule._id.toString()}');">delete</a>
                        </td>
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
    
    // [Path 3 - GET] -- Get a Module - 'http://localhost:5000/modules/get/:moduleId'
    window.editModule = function(moduleId) {             
        currentEditingModuleId = moduleId;  // Change current Editing ModuleId   
    
        let xhr = new XMLHttpRequest();
        xhr.open('GET', `http://localhost:5000/modules/get/${currentEditingModuleId}`, true);
        xhr.send();
        xhr.onerror = function() {
            console.error('Network error');
        };
        xhr.onload = function() {
            if (this.status >= 200 && this.status < 300) {
                // Fill the <form> with fetched Module
                var module = JSON.parse(this.responseText);
                console.log("You are editing this module", module);
                moduleForm.elements['code'].value = module.code;
                moduleForm.elements['moduleName'].value = module.moduleName;

                // Enable edit <button>, disable create <button>
                document.getElementById('editModuleButton').disabled = false;
                document.getElementById('createModuleButton').disabled = true;
            } else {
                console.log('Failed to Get this Module:', this.statusText);
            }
        };
    };

    // [Path 4 - PUT] -- Update a Module - 'http://localhost:5000/modules/update/:moduleId'
    document.getElementById('editModuleButton').addEventListener('click',  function(event) {
        event.preventDefault();

        // Populate `module` Object with the content of <form>
        var formData = new FormData(moduleForm);
        var module = {};
        formData.forEach(function(value, key) {
            module[key] = value;
        });

        let xhr = new XMLHttpRequest();
        xhr.open('PUT', `http://localhost:5000/modules/update/${currentEditingModuleId}`, true);
        xhr.setRequestHeader('Content-Type', 'application/json'); // Data Type to be sent: JSON 
        xhr.send(JSON.stringify(module));
        xhr.onerror = function() {
            console.error('Network error');
        };     
        xhr.onload = function() {
            if (this.status >= 200 && this.status < 300) {
                console.log(`Module updated successfully!`);
                refreshModules(); // Refresh <table> after UPDATE

                // Clear the Form Data
                moduleForm.elements['code'].value = "";
                moduleForm.elements['moduleName'].value = "";

                // Disable edit <button>, enable create <button>
                document.getElementById('editModuleButton').disabled = true;
                document.getElementById('createModuleButton').disabled = false;
            } else {
                console.log('Failed to Edit Module:', this.statusText);
            }
        };       
    });

    // [Path 5 -- DELETE] -- Delete a Module - 'http://localhost:5000/modules/delete/:modulId'
    window.deleteModule = function(moduleId) {
        let xhr = new XMLHttpRequest();
        xhr.open('DELETE', `http://localhost:5000/modules/delete/${moduleId}`, true);   
        xhr.send();
        xhr.onerror = function() {
            console.error('Network error');
        };     
        xhr.onload = function() {
            if (this.status >= 200 && this.status < 300) {
                console.log(`Module deleted successfully!`);
                refreshModules(); // Refresh the list after deleting
            } else {
                console.log('Failed to Delete Module:', this.statusText);
            }
        };
    }; 

}); // End of Load Page