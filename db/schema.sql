CREATE DATABASE burger_db;
USE burger_db;

CREATE TABLE burger(
id int auto_increment not null,
burger_name varchar(30) not null,
devoured boolean Default false,

primary key(id)
);