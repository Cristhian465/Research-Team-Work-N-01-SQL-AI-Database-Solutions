import sqlite3

def setup_database():
    """Sets up a sample SQLite database with some dummy data."""
    conn = sqlite3.connect('sales.db')
    cursor = conn.cursor()
    
    # Create table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY,
            product_name TEXT,
            quantity INTEGER,
            price REAL,
            order_date TEXT
        )
    ''')
    
    # Insert some dummy data if empty
    cursor.execute("SELECT COUNT(*) FROM orders")
    if cursor.fetchone()[0] == 0:
        sample_data = [
            ('Laptop', 5, 1200.00, '2023-10-01'),
            ('Mouse', 15, 25.50, '2023-10-02'),
            ('Keyboard', 10, 45.00, '2023-10-03'),
            ('Monitor', 3, 300.00, '2023-10-04')
        ]
        cursor.executemany('INSERT INTO orders (product_name, quantity, price, order_date) VALUES (?, ?, ?, ?)', sample_data)
        conn.commit()
    
    return conn

def execute_sql(conn, query):
    """Executes a SQL query and returns the results."""
    try:
        cursor = conn.cursor()
        cursor.execute(query)
        columns = [description[0] for description in cursor.description]
        results = cursor.fetchall()
        return columns, results
    except Exception as e:
        return None, str(e)

if __name__ == "__main__":
    print("Setting up the database...")
    conn = setup_database()
    
    # In a real-world scenario with an LLM, this SQL would be generated dynamically.
    # Here, we simulate the output of an LLM transforming: "What is the total revenue from Laptops?"
    # into the following SQL:
    
    simulated_llm_sql_output = "SELECT SUM(quantity * price) as total_revenue FROM orders WHERE product_name = 'Laptop';"
    
    print(f"\nSimulated Natural Language Query: What is the total revenue from Laptops?")
    print(f"Simulated Generated SQL: {simulated_llm_sql_output}")
    
    columns, results = execute_sql(conn, simulated_llm_sql_output)
    
    if columns:
        print("\nQuery Results:")
        print(columns)
        for row in results:
            print(row)
    else:
        print(f"Error executing query: {results}")

    conn.close()
