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
            refreshModules(); // Refresh <table> after UPDATE
            console.log(`Module: ${currentEditingModuleId} updated successfully`);

            // Disable edit <button>, enable create <button>
            document.getElementById('editModuleButton').disabled = true;
            document.getElementById('createModuleButton').disabled = false;
        } else {
            console.log('Failed to Edit Module:', this.statusText);
        }
    };       
});