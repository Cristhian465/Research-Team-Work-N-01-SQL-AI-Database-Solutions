# AI Text-to-SQL Database Explorer 🚀

A web-based interface demonstrating how Natural Language processing can translate user inquiries into database SQL statements and retrieve the corresponding records dynamically. Built for the Research Team Work N° 01.

Live Demo: [https://cristhian465.github.io/Research-Team-Work-N-01-SQL-AI-Database-Solutions/](https://cristhian465.github.io/Research-Team-Work-N-01-SQL-AI-Database-Solutions/)

---

## 📸 Interface Design
Features a modern **Dark Glassmorphic UI/UX** that adapts beautifully to any device.
- Preconfigured schema overview.
- Quick-select queries for revenue, pricing, and counts.
- Natural Language Input parsing.
- Interactive database output tables.

---

## 🛠️ Tech Stack & Automation
- **Frontend:** Pure HTML5, CSS3 Custom Properties (Harmonious indigo/dark palette), and Vanilla Javascript.
- **Backend Demo:** Python SQLite integration via `text_to_sql.py`.
- **CI/CD Automation:** Automates test script execution on code pushes using **GitHub Actions** (see `.github/workflows/demo.yml`).
- **Web Deployment:** Configured to deploy the frontend automatically to GitHub Pages.

---

## 🚀 How to Run Locally

### 1. Web UI Interface (Frontend)
Simply open `index.html` directly in any web browser, or use a local development server (like Live Server in VS Code) to test the interactive simulation.

### 2. Database Script (Python Console)
To execute the SQLite query interpreter directly from your terminal:

```bash
python text_to_sql.py
```

Expected output:
```text
Setting up the database...
Simulated Natural Language Query: What is the total revenue from Laptops?
Simulated Generated SQL: SELECT SUM(quantity * price) as total_revenue FROM orders WHERE product_name = 'Laptop';

Query Results:
['total_revenue']
(6000.0,)
```
