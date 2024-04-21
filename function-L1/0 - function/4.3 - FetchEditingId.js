var currentEditingModuleId = null; // Make sure to edit only one module
    
// [Path 3 - GET] -- Get a Module - 'http://localhost:5000/modules/get/:moduleId'
window.editModule = function(moduleId) {    

    currentEditingModuleId = moduleId;  // Change current Editing ModuleId  
    alert(`Editing Module ${moduleId}`);
    
};

// [Path 4 - PUT] -- Update a Module - 'http://localhost:5000/modules/update/:moduleId'
document.getElementById('editModuleButton').addEventListener('click',  function(event) {
    
    event.preventDefault();    
    alert(`Module ${currentEditingModuleId} has been edited!`);
      
});