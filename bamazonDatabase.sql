drop database if exists bamazon;

create database bamazon;

use bamazon;

create table products (
item_id INT NOT NULL AUTO_INCREMENT,
product_name varchar(60),
department_name varchar(60),
price decimal(10,2),
stock_quantity decimal(10,2),
PRIMARY KEY (item_id)
);

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';

insert into products
(item_id,product_name,department_name,price,stock_quantity)
values
(1,'Vacuum','Home',149.50,40),
(2,'Dell Computer','Electronics',1249.50,35),
(3,'Aviator Sunglasses','Fashion and Apparel',129.99,59),
(4,'HDMI Cable','Electronics',22.09,76),
(5,'New Balance Shoes','Sports',69.99,48),
(6,'Backpack','Fashion and Apparel',25.49,11),
(7,'Basketball','Sports',30,21),
(8,'Blender','Kitchen Appliances',41.50,26),
(9,'Bicycle','Sports',149.50,12),
(10,'Television','Electronics',620,18)



