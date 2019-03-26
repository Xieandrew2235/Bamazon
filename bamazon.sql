DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR NOT NULL,
  department_name VARCHAR NOT NULL,
  price DECIMAL (100,2) NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Slaystation", "Games", "300", "365");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bamwow!", "Household", "25", "1975");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("jPhone", "Electronics", "1099", "525");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("BacBook", "Computers", "2099", "150");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tables", "Household", "189", "300");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Mattress", "Household", "899", "55");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tindle"), "Electronics", "169", "1000";

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Jacket", "Clothing", "199", "1000");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bocs", "Sandles", "59", "2250");

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("TV", "Electronics", "999", "20");