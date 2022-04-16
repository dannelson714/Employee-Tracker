const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'rootroot8911@',
        database: 'employees_db'
    },
    console.log('Connected to the employees_db database.')
);





app.use((req, res) => {
    res.status(404).end();
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})