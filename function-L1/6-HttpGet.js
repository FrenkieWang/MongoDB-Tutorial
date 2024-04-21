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