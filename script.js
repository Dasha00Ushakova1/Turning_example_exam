const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db.db');
function getCatalog() {
    db.all("SELECT * FROM Products", (err, rows) => {
        if (err) {
            console.error(err);
            return;
        }
        const catalogBody = document.getElementById('catalog-body');
        rows.forEach((row) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${row.Product_Code}</td>
                <td>${row.Product_Name}</td>
                <td>${row.Price}</td>
                <td>${row.Quantity}</td>
            `;
            catalogBody.appendChild(tr);
        });
    });
}

function getOrders() {
    db.all("SELECT * FROM Orders", (err, rows) => {
        if (err) {
            console.error(err);
            return;
        }
        const ordersBody = document.getElementById('orders-body');
        rows.forEach((row) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${row.Order_Code}</td>
                <td>${row.Customer_Code}</td>
                <td>${row.Order_Date}</td>
                <td>${row.Total_Cost}</td>
            `;
            ordersBody.appendChild(tr);
        });
    });
}

getCatalog();
getOrders();
db.close();
