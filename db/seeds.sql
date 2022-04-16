INSERT INTO department (name)
VALUES ("forking"),
        ("Pooping");

INSERT INTO role (title, salary, department_id)
VALUES ("Good at it", 75000.56, 1),
        ("Maximum Droppage", 100000.00, 2);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("BOB", "BOBBERSON", 1),
        ("BEB", "BEBBERSON", 2);

UPDATE employee SET manager_id = 1 WHERE id = 2;