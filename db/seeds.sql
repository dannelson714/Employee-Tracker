INSERT INTO department (name)
VALUES ("Engineering"),
        ("Finance"),
        ("Legal"),
        ("Sales");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000.00, 4),
        ("Salesperson", 80000.00, 4),
        ("Lead Engineer", 150000.00, 1),
        ("Software Engineer", 120000.00, 1),
        ("Account Manager", 160000.00, 2),
        ("Accountant", 125000.00, 2),
        ("Legal Team Lead", 250000.00, 3),
        ("Lawyer", 190000.00, 3);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("John", "Doe", 1),
        ("Mike", "Chan", 2),
        ("Ashley", "Rodriguez", 3),
        ("Kevin", "Tupik", 4),
        ("Kunal", "Singh", 5),
        ("Malia", "Brown", 6),
        ("Sarah", "Lourd", 7),
        ("Tom", "Allen", 8);

UPDATE employee SET manager_id = 1 WHERE id = 2;
UPDATE employee SET manager_id = 3 WHERE id = 4;
UPDATE employee SET manager_id = 5 WHERE id = 6;
UPDATE employee SET manager_id = 7 WHERE id = 8;