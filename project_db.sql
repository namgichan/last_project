create database if not exists main_db; 

use main_db;

#drop table Users;
create table if not exists Users (
name varchar(45) not null,
id varchar(45) NOT NULL,
password varchar(64) not null,
email varchar(45) not null,

PRIMARY KEY(id)
);

#insert into Users (name, id, password, email) values ('nam','ngc', '123','ngc@naver.com');
#SELECT password From Users Where id = 'ngc';

#DROP TABLE board;
CREATE TABLE IF NOT EXISTS board (
    num INT AUTO_INCREMENT PRIMARY KEY,
    subject VARCHAR(200) NOT NULL,
    content VARCHAR(500) NOT NULL,
    author VARCHAR(45),
    FOREIGN KEY (author) REFERENCES Users (id)
);
#DELETE FROM board
#WHERE num IN ('4', '5','20','21');
#select* from board limit 0,5