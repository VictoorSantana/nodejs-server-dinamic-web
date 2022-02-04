CREATE TABLE plugins ( 
id INT NOT NULL AUTO_INCREMENT, 
id_plugin INT NOT NULL 
, id_args INT NOT NULL 
, PRIMARY KEY (id));ALTER TABLE plugins
                ADD COLUMN createdAt DATETIME NOT NULL,
                ADD COLUMN updatedAt DATETIME NOT NULL;
                

/* ALTER TABLE */ 

ALTER TABLE plugins 
ADD COLUMN id_plugin INT NOT NULL 
, ADD COLUMN id_args INT NOT NULL 
,