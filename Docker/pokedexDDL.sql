DROP DATABASE IF EXISTS Pokedex;
CREATE DATABASE IF NOT EXISTS Pokedex;

USE Pokedex;

/*Table structure for table login */
DROP TABLE IF EXISTS Login;
CREATE TABLE IF NOT EXISTS Login (
    firstName VARCHAR(30) NOT NULL,
    emailAddress VARCHAR(30) NOT NULL,
    functionType VARCHAR(10) NOT NULL,
	accessType INTEGER,
    password VARCHAR(10),
    PRIMARY KEY (emailAddress)
);
	
DROP TABLE IF EXISTS Pokemon;
CREATE TABLE IF NOT EXISTS Pokemon (
    ID INTEGER NOT NULL PRIMARY KEY,
    name VARCHAR(30),
	category VARCHAR(10),
    gender VARCHAR(10),
    attack VARCHAR(20),
    region VARCHAR(20),
    evolution VARCHAR(20),
    description VARCHAR(256),
    photo VARCHAR(45)
);

