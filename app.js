const inq = require('inquirer');
    // EXPORT MODULES

const connection = require("./connection");
//  

function begin() {
    return inq.prompt([
        {
            type: 'list',
            name: 'startOptions',
            message: 'What would you like to do?',
            choices: ['View all Departments', 'View all Roles', 'View all Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employees Role']
        }

    ]).then(data => {
            // view FUNCTIONS
        if (data.startOptions === 'View all Departments') {
            return viewDepartments();
        } else if (data.startOptions === 'View all Roles') {
            return viewRoles();
        } else if (data.startOptions === 'View all Employees') {
            return viewEmployees();
        }   // ADD FUNCTIONS
        else if (data.startOptions === 'Add a Department') {
            return addDepartment()
        } else if(data.startOptions === 'Add a Role') {
            return addRole();
        } else if (data.startOptions === 'Add an Employee') {
            return addEmployee();
        }    // UPDATE FUNCTIONS 
        else if (data.startOptions === 'Update an Employees Role') {
            return updateEmployee();
        }
    });
};


    // ViewAll functions
async function viewDepartments() {
    connection.promise().query(
        `SELECT * FROM department`,
        
    ).then(res => {
        
        console.table(res[0]);
        return inq.prompt([
            {
                type: 'confirm',
                name: 'backToStart',
                message: 'Would you like to continue?'
            },
        ]).then( data => {
            if (data.backToStart) {
                return begin()
            } 
        });
    }).catch(err => console.log(err));

    
    
}
function viewRoles() {
    connection.promise().query("SELECT * FROM role").then(res => {
        console.table(res[0]);
        return inq.prompt([
            {
                type: 'confirm',
                name: 'backToStart',
                message: 'Would you like to continue?'
            },
        ]).then( data => {
            if (data.backToStart) {
                return begin()
            } 
        });
    })
    
}
function viewEmployees() {
    
    connection.promise().query(`SELECT * FROM employee`).then(res => {
        console.table(res[0]);

        return inq.prompt([
            {
                type: 'confirm',
                name: 'backToStart',
                message: 'Would you like to continue?'
            },
        ]).then( data => {
            if (data.backToStart) {
                return begin()
            } 
        });

    })
    
}
    // Add functions
function addDepartment() {
    return inq.prompt([
        {
            type: 'text',
            name: 'addDepartmentName',
            message: 'Please add the name of the department'
        },
        {
            type: 'confirm',
            name: 'backToStart',
            message: 'Would you like to go back to the starting menu?'
        }
    ]).then( data => {
       connection.promise().query(`INSERT INTO department SET ?`, {name:data.addDepartmentName}).then(res => {

        console.table(res[0]);
        if (data.backToStart) {
            return begin()
        } 

       }).catch(error=>{
           console.log("Error Adding Departmant: " + error);
            return begin();
        })
        
        
    });
};
function addRole() {
    return inq.prompt([
        {
            type: 'text',
            name: 'addRoleName',
            message: 'Please enter the name of the role'
        },
        {
            type: 'text',
            name: 'addRoleSalary',
            message: 'What is the salary of the role'
        },
        {
            type: 'text',
            name: 'addRoleDepartment',
            message: 'Please enter the department id of the role'
        },
        {
            type: 'confirm',
            name: 'backToStart',
            message: 'Would you like to go back to the starting menu?'
        }
    ]).then( data => {
        
        connection.promise().query(`INSERT INTO role SET ?`,
        {
            title: data.addRoleName,
            salary: parseInt(data.addRoleSalary),
            department_id: parseInt(data.addRoleDepartment)

        }).then(res => {
            console.log("Role added.");
            if (data.backToStart) {
                return begin()
            } 
        }).catch(error=>{
            console.log("Error Adding Role: ", + error);
            return begin();
        })
        
    });
};
function addEmployee() {
    return inq.prompt([
        {
            type: 'text',
            name: 'addEmployeeFirstName',
            message: 'What is the first name of the employee?'
        },
        {
            type: 'text',
            name: 'addEmployeeLastName',
            message: 'What is the last name of the employee?'
        },
        {
            type: 'text',
            name: 'addEmployeeRole',
            message: 'What is the role id of the employee?'
        },
        {
            type: 'text',
            name: 'addEmployeeManager',
            message: 'What is the manager id of the employee?'
        },
        {
            type: 'confirm',
            name: 'backToStart',
            message: 'Would you like to go back to the starting menu?'
        }
    ]).then( data => {
        connection.promise().query(`INSERT INTO employee SET ?`,
        {
        first_name: data.addEmployeeFirstName,
        last_name: data.addEmployeeLastName,
        role_id: data.addEmployeeRole,
        manager_id: data.addEmployeeManager
        }).then(res => {
            console.log("Employee Added.");
            if (data.backToStart) {
                return begin()
            } 
        }).catch(error=>{
            console.log("Error Adding Employee: " + error);
            return begin();
        })
       
    });
};
    // Update Functions
function updateEmployee() {
    return inq.prompt([
        {
            type: 'text',
            name: 'updateEmployee',
            message: "Select an employee you'd like to change.",
        },
        {
            type: 'text',
            name: 'updateRole',
            message: 'What is the id there new role?'
        },
        {
            type: 'confirm',
            name: 'backToStart',
            message: 'Would you like to continue?'
        },
    ]).then( data => {
        connection.promise().query(`UPDATE employee SET ? WHERE ?`,
        [
            {
                role_id: data.updateRole
             },
             {
                first_name: data.updateEmployee
             }
        ]).then(res => {
            console.log("Employee updated.");

            if (data.backToStart) {
                return begin()
            } 
        }).catch(error=>{
            console.log("Error Updating Employee: " + error);
            return begin();
        })
        
    });
}

begin();