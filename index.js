function getTeamMember() {
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
        
    })
}


// Create a function to initialize app
function init() {
    console.log("Welcome to the Employee Tracker");
    const manager = new Manager();
    questionArray = [];
    questionArray.push(manager.getName('manager'), manager.getId('manager'), manager.getEmail('manager'), manager.getOfficeNumber())
    inquirer
        .prompt(questionArray)
        .then((data) => {
            manager.name = data.name_input;
            manager.id = data.id;
            manager.email = data.email;
            manager.officeNumber = data.office;
            employeeList.push(manager);
            console.log(employeeList);
            getTeamMember();
        })
}

init();