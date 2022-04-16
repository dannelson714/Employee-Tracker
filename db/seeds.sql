INSERT INTO department (name)
VALUES ("forking"),
        ("spooning");

INSERT INTO role (title, salary, department_id)
VALUES ("Manager", 75000.56, 1),
        ("Middle Manager", 100000.00, 2);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("BOB", "BOBBERSON", 1),
        ("BEB", "BEBBERSON", 2);

UPDATE employee SET manager_id = 1 WHERE id = 2;