using System;
using System.Data.SQLite;
using System.Windows.Forms;
public class Shop
{
    private SQLiteConnection connection;
    private SQLiteCommand command;

    public Shop(string connectionString)
    {
        connection = new SQLiteConnection(connectionString);
        connection.Open();
    }
    public void CreateDatabase()
    {
        string createTableProducts = "CREATE TABLE IF NOT EXISTS Products (Product_Code INT PRIMARY KEY, Product_Name VARCHAR(255), Price DECIMAL(10, 2), Quantity INT)";
        string createTableCustomers = "CREATE TABLE IF NOT EXISTS Customers (Customer_Code INT PRIMARY KEY, First_Name VARCHAR(255), Last_Name VARCHAR(255), Birth_Date DATE, Address VARCHAR(255), Phone VARCHAR(20))";
        string createTableOrders = "CREATE TABLE IF NOT EXISTS Orders (Order_Code INT PRIMARY KEY, Customer_Code INT, Order_Date DATE, Total_Cost DECIMAL(10, 2), FOREIGN KEY (Customer_Code) REFERENCES Customers (Customer_Code))";
        string createTableOrderDetails = "CREATE TABLE IF NOT EXISTS Order_Details (Order_Code INT, Product_Code INT, Quantity INT, PRIMARY KEY (Order_Code, Product_Code), FOREIGN KEY (Order_Code) REFERENCES Orders (Order_Code), FOREIGN KEY (Product_Code) REFERENCES Products (Product_Code))";

        command = new SQLiteCommand(createTableProducts, connection);
        command.ExecuteNonQuery();
        command = new SQLiteCommand(createTableCustomers, connection);
        command.ExecuteNonQuery();
        command = new SQLiteCommand(createTableOrders, connection);
        command.ExecuteNonQuery();
        command = new SQLiteCommand(createTableOrderDetails, connection);
        command.ExecuteNonQuery();
    }

    public void InsertData()
    {
        string insertIntoProducts = "INSERT INTO Products (Product_Code, Product_Name, Price, Quantity) VALUES (1, 'Белые перчатки', 557.00, 10)";
        string insertIntoCustomers = "INSERT INTO Customers (Customer_Code, First_Name, Last_Name, Birth_Date, Address, Phone) VALUES (1, 'Юдер', 'Айл', '2006-05-25', 'Горы Айрик', '8-800-123-4567')";
        string insertIntoOrders = "INSERT INTO Orders (Order_Code, Customer_Code, Order_Date, Total_Cost) VALUES (1, 8, '2026-01-01', 1102.00)";
        string insertIntoOrderDetails = "INSERT INTO Order_Details (Order_Code, Product_Code, Quantity) VALUES (1, 8, 1)";

        command = new SQLiteCommand(insertIntoProducts, connection);
        command.ExecuteNonQuery();
        command = new SQLiteCommand(insertIntoCustomers, connection);
        command.ExecuteNonQuery();
        command = new SQLiteCommand(insertIntoOrders, connection);
        command.ExecuteNonQuery();
        command = new SQLiteCommand(insertIntoOrderDetails, connection);
        command.ExecuteNonQuery();
    }

    public void GetProducts()
    {
        string query = "SELECT * FROM Products";
        command = new SQLiteCommand(query, connection);
        SQLiteDataReader reader = command.ExecuteReader();
        while (reader.Read())
        {
            Console.WriteLine($"Product_Code: {reader["Product_Code"]}, Product_Name: {reader["Product_Name"]}, Price: {reader["Price"]}, Quantity: {reader["Quantity"]}");
        }
        reader.Close();
    }

    public void GetOrders()
    {
        string query = "SELECT * FROM Orders";
        command = new SQLiteCommand(query, connection);
        SQLiteDataReader reader = command.ExecuteReader();
        while (reader.Read())
        {
            Console.WriteLine($"Order_Code: {reader["Order_Code"]}, Customer_Code: {reader["Customer_Code"]}, Order_Date: {reader["Order_Date"]}, Total_Cost: {reader["Total_Cost"]}");
        }
        reader.Close();
    }

    public void GetOrderDetails()
    {
        string query = "SELECT * FROM Order_Details";
        command = new SQLiteCommand(query, connection);
        SQLiteDataReader reader = command.ExecuteReader();
        while (reader.Read())
        {
            Console.WriteLine($"Order_Code: {reader["Order_Code"]}, Product_Code: {reader["Product_Code"]}, Quantity: {reader["Quantity"]}");
        }
        reader.Close();
    }

    public void CalculatePrice()
    {
        string query = "SELECT Price, Quantity FROM Products";
        command = new SQLiteCommand(query, connection);
        SQLiteDataReader reader = command.ExecuteReader();
        while (reader.Read())
        {
            decimal price = Convert.ToDecimal(reader["Price"]);
            int quantity = Convert.ToInt32(reader["Quantity"]);
            decimal total = price * quantity;
            Console.WriteLine($"Price: {price}, Quantity: {quantity}, Total: {total}");
        }
        reader.Close();
    }
}
class Program
{
    static void Main(string[] args)
    {
        string connectionString = "Data Source=shop.db";
        Shop shop = new Shop(connectionString);
        shop.CreateDatabase();
        shop.InsertData();
        shop.GetProducts();
        shop.GetOrders();
        shop.GetOrderDetails();
        shop.CalculatePrice();
    }
}
