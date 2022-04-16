const express = require('express');
const mysql = require('mysql2');

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
    console.table(results);
    console.log(results);
});

function findManagerName(array) {
    array.forEach(element => {
        if (element.manager_id === !null) {
            for (i=0; i<array.length; i++) {
                if (element.manager_id === array[i].manager_id)
            }
        }
    });

}





app.use((req, res) => {
    res.status(404).end();
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})