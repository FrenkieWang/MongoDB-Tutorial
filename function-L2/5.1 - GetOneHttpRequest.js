// [Path 3 - GET] -- Get a Module - 'http://localhost:5000/modules/get/:moduleId'
window.editModule = function(moduleId) {             
    currentEditingModuleId = moduleId;  // Change current Editing ModuleId   

    let xhr = new XMLHttpRequest();
    xhr.open('GET', `http://localhost:5000/modules/get/${moduleId}`, true);
    xhr.send();
    xhr.onerror = function() {
        console.error('Network error');
    };
    xhr.onload = function() {
        if (this.status >= 200 && this.status < 300) {
            // Get First element of JSON Array, print it on Console
            var module = JSON.parse(this.responseText);
            console.log("Get this Module", module); 

            // Fill the <form> with fetched Module
            let moduleForm = document.getElementById('moduleForm');
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