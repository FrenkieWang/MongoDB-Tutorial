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
            console.log(`Module: ${moduleId} deleted successfully`);
            refreshModules(); // Refresh the list after deleting
        } else {
            console.log('Failed to Delete Module:', this.statusText);
        }
    };
}; 