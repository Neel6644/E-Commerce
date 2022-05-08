CREATE DATABASE E-Commerce



-- extension of  uuid 
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

--USER TABLE
CREATE TABLE users(
    user_id uuid DEFAULT gen_random_uuid (),
    user_firstName varchar(255) not null,
    user_lastName varchar(255) not null,
    user_email varchar(255) not null,
    user_password varchar(255) not null,
    PRIMARY KEY (user_id)
);


--Product table
CREATE TABLE products(
    product_id serial not null,
    product_name varchar(255) not null,
     product_description varchar(255) not null,
    product_price int not null,
    PRIMARY KEY (product_id)
);

-- order
CREATE TABLE orders(
    order_id serial not null,
    create_order date not null,
    modify_order date,
    user_id uuid,
    PRIMARY KEY(order_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
 
 --order table 
CREATE TABLE orderItems(
    orderItem_id serial not null,
    product_id int not null,
    order_id int not null,
    price int not null,
    quality int not null,
    PRIMARY KEY(orderItem_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    FOREIGN KEY (order_id) REFERENCES orders(order_id)
);

--cart table 
CREATE TABLE carts(
    cart_id serial not null,
    create_cart date,
    modify_cart date,
    PRIMARY KEY (cart_id)
);

--CARD ITEMS
CREATE TABLE cartItems(
    cartItem_id serial not null,
    product_id int not null,
    cart_id int not null,
    PRIMARY KEY (cartItem_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    FOREIGN KEY (cart_id) REFERENCES carts(cart_id)
);


--quary for product 
insert into products (product_name,product_description,product_price,category) values ('levis clothes','good materials',400,'clothes');



