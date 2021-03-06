const express = require('express');
const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false}));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'rootroot8911@',
        database: 'employees_db'
    },
    console.log('Connected to the employees_db database.')
);


function showAllEmployees(){
//WHEN I choose to view all employees
//THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, 
//job titles, departments, salaries, and managers that the employees report to
    const empQuery = `SELECT employee.id, employee.first_name, employee.last_name, department.name, role.title, role.salary, employee.manager_id 
    FROM  department
    JOIN role ON role.department_id = department.id
    JOIN employee ON role.id = employee.role_id
    ORDER BY employee.id ASC;`;

    db.query(`${empQuery}`, function (err, results) {
        newList = findManagerName(results)
        console.table(newList);
        getTeamMember();
    });
}

function updateEmployeeRole() {
    //WHEN I choose to update an employee role
    //THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
    const upRoleTitles = [];
    db.query('SELECT * FROM role', function(err, results) {
        for (i=0; i<results.length; i++) {
            upRoleTitles.push(results[i].title)
        }
        const empNames = [];
        db.query('SELECT first_name, last_name FROM employee', function(err, results) {
            for (i=0; i<results.length; i++) {
                let fullName = results[i].first_name + " " + results[i].last_name;
                empNames.push(fullName);
            }
            const employeeRoleChoices = [
                {
                    type: 'list',
                    message: "What is the employee's new role at the company? ",
                    name: 'empRole',
                    choices: upRoleTitles
                },
                {
                    type:'list',
                    message: "For which employee would you like to update a role?",
                    name: 'empName',
                    choices: empNames
                }
            ]
            inquirer
                .prompt(employeeRoleChoices)
                .then((data) => {
                    let roleTitle = data.empRole;
                    db.query('SELECT * FROM role', function(err, results) {
                        let roleId = -1;
                        for (i=0; i<results.length; i++) {
                            if (roleTitle === results[i].title){
                                roleId = results[i].id
                                roleId
                            }
                        }
                        const employeeName = data.empName.split(" ");
                        db.query('SELECT * FROM employee', function(err, results) {
                            let empId = -1;
                            for (i=0; i<results.length; i++) {
                                if (employeeName[0] === results[i].first_name && employeeName[1] === results[i].last_name) {
                                    empId = results[i].id;
                                }
                            }
                            db.query(`UPDATE employee SET role_id = ? WHERE id = ?`, [roleId, empId], function(err,results) {
                                console.log(`${data.empName}'s role has been changed to ${data.empRole}!`);
                                getTeamMember();
                            })
                        })
                    })
                    
                    
                })
        })
    })  
}

function viewAllRoles() {
//WHEN I choose to view all roles
//THEN I am presented with the job title, role id, the department that role belongs to, 
//and the salary for that role
    const roleQuery = `SELECT role.title, role.salary, department.name
    FROM department
    INNER JOIN role ON role.department_id = department.id;`
    db.query(`${roleQuery}`, function (err, results) {
        console.table(results);
        getTeamMember();
    })
}

function viewAllDepartments() {
    //WHEN I choose to view all departments
    //THEN I am presented with a formatted table showing department names and department ids
    db.query(`SELECT * FROM department`, function (err, results) {
        console.table(results);
        getTeamMember();
    })
}

function addDepartment() {
   //WHEN I choose to add a department
   //THEN I am prompted to enter the name of the department and that department is added to the database
   const departmentInput = [
    {
        type: 'input',
        name: 'deptName',
        message: "What is the new department's name? "
    }
    ]
    inquirer
        .prompt(departmentInput)
        .then((data) => {
            db.query(`INSERT INTO department (name) VALUES (?)`, [data.deptName], function(err, results) {
                console.log(`${data.deptName} added as a new department!`);
                getTeamMember();
            })
        })
}

function addEmployee() {
    //WHEN I choose to add an employee
//THEN I am prompted to enter the employee???s first name, last name, role, and manager, and that employee is added to the database
    const roleTitles = [];
    db.query('SELECT * FROM role', function(err, results) {
        for (i=0; i<results.length; i++) {
            roleTitles.push(results[i].title)
        }
    })
    const manNames = ['None'];
    db.query('SELECT first_name, last_name FROM employee', function(err, results) {
        for (i=0; i<results.length; i++) {
            let fullName = results[i].first_name + " " + results[i].last_name;
            manNames.push(fullName);
        }
    })
    const employeeChoices = [
        {
            type: 'input',
            name: 'firstName',
            message: "What is the employee's first name? "
        },
        {
            type: 'input',
            name: 'lastName',
            message: "What is the employee's last name? "
        },
        {
            type: 'list',
            message: "What is the employee's employees role at the company? ",
            name: 'empRole',
            choices: roleTitles
        },
        {
            type: 'list',
            message: "Who is the employee's manager? ",
            name: 'empManager',
            choices: manNames
        }
    ]
    inquirer
        .prompt(employeeChoices)
        .then((data) => {
            const roleTitle = data.empRole;
            var roleId = -1;
            db.query('SELECT * FROM role', function(err, results) {
                for (i=0; i<results.length; i++) {
                    if (roleTitle === results[i].title){
                        roleId = results[i].id
                    }
                }
                const managerName = data.empManager.split(" ");
                let manId = null;
                db.query('SELECT * FROM employee', function(err, results) {
                    for (i=0; i<results.length; i++) {
                        if (managerName[0] === results[i].first_name && managerName[1] === results[i].last_name) {
                            manId = results[i].id;
                        }
                    }
                    const empAdd = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                    VALUES (?,?,?,?)`;
                    db.query(`${empAdd}`,[data.firstName,data.lastName,roleId,manId], function(err, results) {
                    console.log(`${data.firstName} ${data.lastName} has been added!`);
                    getTeamMember();
                })
            })    
            })
            
        })
}

function addRole() {
    //WHEN I choose to add a role
    //THEN I am prompted to enter the name, salary, and department for the role and that role is added 
    //to the database
    const deptNames = [];
    db.query('SELECT * FROM department', function(err, results) {
        for (i=0; i<results.length; i++) {
            deptNames.push(results[i].name)
        }})
        const roleChoices = [
            {
                type: 'input',
                name: 'roleTitle',
                message: "What is the name of the new role? "
            },
            {
                type: 'input',
                name: 'roleSalary',
                message: "What is the salary of the new role to two decimal places? "
            },
            {
                type: 'list',
                message: "Which department will the new role be part of? ",
                name: 'roleDept',
                choices: deptNames
            }
        ]
        inquirer
        .prompt(roleChoices)
        .then((data) => {
            const deptName = data.roleDept;
            db.query('SELECT * FROM department', function(err, results) {
                let deptId = -1;
                for (i=0; i<results.length; i++) {
                    if (deptName === results[i].name){
                        deptId = results[i].id
                    }
                }
                const roleAdd = `INSERT INTO role (title, salary, department_id)
                VALUES (?,?,?)`;
                db.query(`${roleAdd}`,[data.roleTitle, data.roleSalary, deptId], function (err, results) {
                console.log(`${data.roleTitle} has been added as a new role!`);
                getTeamMember();
                })
            })
            
        })
}

function findManagerName(array) {
    //A function to convert from a manager name to an integer id so as to add new employees according to the
    //table designs
    array.forEach(element => {
        if (element.manager_id) {
            for (i=0; i<array.length; i++) {
                if (element.manager_id === array[i].id) {
                    element.manager_id = array[i].first_name + ' ' + array[i].last_name;

                }
            }
        }
        else {
            element.manager_id = null
        }
    });
    return array;
}

function getTeamMember() {
    //Function to produce the question bank that is returned to after successful queries
    const employeeQuestion = [
        {
        type: 'list',
        message: 'What would you like to do?',
        name: 'topMenu',
        choices: ['View All Employees','Add Employee','Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
        }
    ]
    inquirer
        .prompt(employeeQuestion)
        .then((data) => {
            questionResult(data.topMenu)
    })
}

function questionResult(data) {
    //Switch statement to handle the various choices; fed the above functions and their resulting queries
    switch(data) {
        case 'View All Employees':
            showAllEmployees();
            break;
        case 'Add Employee':
            addEmployee();
            break;
        case 'Update Employee Role':
            updateEmployeeRole();
            break;
        case 'View All Roles':
            viewAllRoles();
            break;
        case 'Add Role':
            addRole();
            break;
        case 'View All Departments':
            viewAllDepartments();
            break;
        case 'Add Department':
            addDepartment();
            break;
        case 'Quit':
            break;
    }
}

app.use((req, res) => {
    res.status(404).end();
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    getTeamMember();
})

