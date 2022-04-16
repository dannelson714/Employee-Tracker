const express = require('express');
const mysql = require('mysql2');
const cTable = require('console.table');

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

//Functions that will perform the queries as specified. To be moved into modular file.

//WHEN I choose to view all departments
//THEN I am presented with a formatted table showing department names and department ids

const newQuery = `SELECT employee.id, employee.first_name, employee.last_name, department.name, role.title, role.salary, employee.manager_id 
FROM  department
INNER JOIN role ON role.department_id = department.id
INNER JOIN employee ON role.id = employee.role_id;`;

db.query(`${newQuery}`, function (err, results) {
    console.log(results);
    newList = findManagerName(results)

    console.table(newList);
});
    

function findManagerName(array) {
    array.forEach(element => {
        console.log(element.manager_id);
        if (element.manager_id) {
            console.log(element.manager_id);
            for (i=0; i<array.length; i++) {
                if (element.manager_id === array[i].id) {
                    element.manager_id = array[i].first_name + ' ' + array[i].last_name;
                    console.log(element.manager_id);
                }
            }
        }
    });
    return array;
}





app.use((req, res) => {
    res.status(404).end();
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})