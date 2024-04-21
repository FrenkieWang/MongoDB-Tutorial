// [Path 3 - GET] -- Get a Module - 'http://localhost:5000/modules/get/:moduleId'
window.editModule = function(moduleId) {           
    alert(`Editing Module ${moduleId}`);

    // Enable edit <button>, disable create <button>
    document.getElementById('editModuleButton').disabled = false;
    document.getElementById('createModuleButton').disabled = true;       
};

// [Path 4 - PUT] -- Update a Module - 'http://localhost:5000/modules/update/:moduleId'
document.getElementById('editModuleButton').addEventListener('click',  function(event) {
    // Disable edit <button>, enable create <button>
    document.getElementById('editModuleButton').disabled = true;
    document.getElementById('createModuleButton').disabled = false;          
});

document.getElementById(`${id}`).disabled = true;
document.getElementById(`${id}`).disabled = false;   