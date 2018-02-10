
DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;
USE bamazon_DB;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR (100) NULL,
    department_name VARCHAR (100) NULL,
    price DECIMAL (10, 2) NULL,
    stock_quantity INTEGER (10) NULL,
    product_sales INTEGER (100) NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Surfboard (short)", "Surf gear", 300, 20),("Surfboard (long)", "Surf gear", 500, 12),("Wetsuit","Surf gear", 150, 24),("Bodyboard","Surf gear", 200, 8),("Swim Fins","Surf gear", 60, 10),
        ("Ethereum", "Crypto", 850.54, 989),("NANO","Crypto", 12.59, 605),("Stellar","Crypto", 0.76,678),("Snowboard","Snow gear", 325, 32),("Snowboard Boots", "Snow gear",120,26);

CREATE TABLE departments (
    department_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR (100) NULL,
    over_head_costs INTEGER (10) NULL,
    PRIMARY KEY (department_id)
);
INSERT INTO departments (department_name,over_head_costs)
VALUES ("Surf gear", 1000),("Crypto", 100),("Snow gear", 1200);
