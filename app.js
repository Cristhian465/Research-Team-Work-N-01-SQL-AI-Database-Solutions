// Simulated database orders
const mockDatabase = [
    { id: 1, product_name: 'Laptop', quantity: 5, price: 1200.00, order_date: '2023-10-01' },
    { id: 2, product_name: 'Mouse', quantity: 15, price: 25.50, order_date: '2023-10-02' },
    { id: 3, product_name: 'Keyboard', quantity: 10, price: 45.00, order_date: '2023-10-03' },
    { id: 4, product_name: 'Monitor', quantity: 3, price: 300.00, order_date: '2023-10-04' }
];

function selectQuestion(text) {
    document.getElementById('nl-input').value = text;
}

function processQuery() {
    const input = document.getElementById('nl-input').value.trim();
    if (!input) return;

    const btn = document.getElementById('generate-btn');
    btn.disabled = true;
    btn.innerText = "Analyzing...";

    // Simulate LLM loading latency
    setTimeout(() => {
        let sql = "";
        let columns = [];
        let rows = [];

        const lowercaseInput = input.toLowerCase();

        if (lowercaseInput.includes('revenue') || lowercaseInput.includes('laptop')) {
            sql = "SELECT SUM(quantity * price) as total_revenue \nFROM orders \nWHERE product_name = 'Laptop';";
            columns = ['total_revenue'];
            const total = mockDatabase
                .filter(item => item.product_name === 'Laptop')
                .reduce((sum, item) => sum + (item.quantity * item.price), 0);
            rows = [[`$${total.toFixed(2)}`]];
        } 
        else if (lowercaseInput.includes('greater than 100') || lowercaseInput.includes('100')) {
            sql = "SELECT id, product_name, price \nFROM orders \nWHERE price > 100;";
            columns = ['id', 'product_name', 'price'];
            rows = mockDatabase
                .filter(item => item.price > 100)
                .map(item => [item.id, item.product_name, `$${item.price.toFixed(2)}`]);
        } 
        else if (lowercaseInput.includes('keyboard') || lowercaseInput.includes('sold')) {
            sql = "SELECT SUM(quantity) as total_sold \nFROM orders \nWHERE product_name = 'Keyboard';";
            columns = ['total_sold'];
            const total = mockDatabase
                .filter(item => item.product_name === 'Keyboard')
                .reduce((sum, item) => sum + item.quantity, 0);
            rows = [[total]];
        } 
        else {
            // Generic dynamic response for custom queries
            const tables = ["orders"];
            sql = `SELECT * \nFROM ${tables[0]} \nLIMIT 5;`;
            columns = ['id', 'product_name', 'quantity', 'price', 'order_date'];
            rows = mockDatabase.map(item => [item.id, item.product_name, item.quantity, `$${item.price.toFixed(2)}`, item.order_date]);
        }

        displayResults(sql, columns, rows);
        btn.disabled = false;
        btn.innerText = "Generate & Run";
    }, 1000);
}

function displayResults(sql, columns, rows) {
    const resultSection = document.getElementById('result-section');
    resultSection.classList.remove('hidden');

    // Display SQL code
    document.getElementById('sql-output').innerText = sql;

    // Display Headers
    const headersTr = document.getElementById('table-headers');
    headersTr.innerHTML = '';
    columns.forEach(col => {
        const th = document.createElement('th');
        th.innerText = col;
        headersTr.appendChild(th);
    });

    // Display Rows
    const rowsTbody = document.getElementById('table-rows');
    rowsTbody.innerHTML = '';
    rows.forEach(row => {
        const tr = document.createElement('tr');
        row.forEach(val => {
            const td = document.createElement('td');
            td.innerText = val;
            tr.appendChild(td);
        });
        rowsTbody.appendChild(tr);
    });

    // Smooth scroll to results
    resultSection.scrollIntoView({ behavior: 'smooth' });
}
