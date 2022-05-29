# run this script for mysql database

//create database
CREATE DATABASE schoolmngsys;

//create table
CREATE TABLE school(
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    code VARCHAR(45) UNIQUE NOT NULL,
    create_on DATETIME NOT NULL,
    updated_on DATETIME,
    delete_on DATETIME,
    name VARCHAR(150) NOT NULL,
    about VARCHAR(1000) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(40) NOT NULL,
    address VARCHAR(200) NOT NULL,
    logo VARCHAR(200) NOT NULL);