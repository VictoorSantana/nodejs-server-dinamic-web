CREATE TABLE layouts ( 
id INT NOT NULL AUTO_INCREMENT, 
name VARCHAR(60) NOT NULL 
,plugins VARCHAR(150) NOT NULL 
,PRIMARY KEY (id));ALTER TABLE layouts
                ADD COLUMN createdAt DATETIME NOT NULL,
                ADD COLUMN updatedAt DATETIME NOT NULL;
                

/* ALTER TABLE */ 

ALTER TABLE layouts 
ADD COLUMN name VARCHAR(60) NOT NULL 
,ADD COLUMN plugins VARCHAR(150) NOT NULL 
