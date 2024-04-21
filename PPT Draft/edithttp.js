
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
            var module = JSON.parse(this.responseText);
 
            let moduleForm = document.getElementById('moduleForm');
            moduleForm.elements['code'].value = module.code;
            moduleForm.elements['moduleName'].value = module.moduleName;

            document.getElementById('editModuleButton').disabled = false;
            document.getElementById('createModuleButton').disabled = true;
        } else {
            console.log('Failed to Get this Module:', this.statusText);
        }
    };
};