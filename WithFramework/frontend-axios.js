document.addEventListener('DOMContentLoaded', function() {
    refreshModules(); // Refresh Modules when Browser loaded

    // [Path 1 - Get] -- Get all Modules - 'http://localhost:5000/modules/get'
    function refreshModules() {
        axios.get('http://localhost:5000/modules/get')
            .then((response) => {    
                const moduleList = document.getElementById('moduleList');
                moduleList.innerHTML = ''; // Clear Module Table

                const modules = response.data;
                console.log(modules);
                // Create every Table Row in <tbody id="moduleList">
                modules.forEach(currentModule => {
                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td>${currentModule._id}</td> 
                        <td>${currentModule.code}</td>
                        <td>${currentModule.moduleName}</td> 
                    `;
                    moduleList.appendChild(tr);
                });
            })
            .catch((error) => {
                console.error('Failed to fetch Modules:', error.message);
            });
    }        

    // [Path 2 - POST] -- Create a Module - 'http://localhost:5000/modules/create'
    document.getElementById('createModuleButton').addEventListener('click', function(event) {
        event.preventDefault(); 
    
        // Populate `module` Object with the content of <form>
        var formData = new FormData(moduleForm);
        var module = {};
        formData.forEach(function(value, key) {
            module[key] = value;
        });
        console.log(module);
    
        axios.post('http://localhost:5000/modules/create', module)
            .then((response) => {
                refreshModules(); // Refresh <table> after CREATE
                console.log('New Module Created successfully');
            })
            .catch((error) => {
                console.error('Failed to Create a Module:', error.message);
            });
    });        

}); // End of Load Page