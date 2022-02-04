CREATE TABLE sections ( 
id INT NOT NULL AUTO_INCREMENT, 
id_layout INT NOT NULL 
, id_section INT NOT NULL 
, title VARCHAR(100) NOT NULL 
,description VARCHAR(100) NOT NULL 
,display INT NULL 
, PRIMARY KEY (id));ALTER TABLE sections
                ADD COLUMN createdAt DATETIME NOT NULL,
                ADD COLUMN updatedAt DATETIME NOT NULL;
                

/* ALTER TABLE */ 

ALTER TABLE sections 
ADD COLUMN id_layout INT NOT NULL 
, ADD COLUMN id_section INT NOT NULL 
, ADD COLUMN title VARCHAR(100) NOT NULL 
,ADD COLUMN description VARCHAR(100) NOT NULL 
,ADD COLUMN display INT NULL 
,