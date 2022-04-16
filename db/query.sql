SELECT employee. id, employee.first_name, employee.last_name, department.name, role.title, role.salary, employee.manager_id
FROM  department
INNER JOIN role ON role.department_id = department.id
INNER JOIN employee ON role.id = employee.role_id;