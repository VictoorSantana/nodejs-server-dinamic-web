CREATE TABLE articles ( 
id INT NOT NULL AUTO_INCREMENT, 
id_layout INT NOT NULL 
, id_cover_image INT NOT NULL 
, id_section INT NOT NULL 
, short VARCHAR(130) NULL 
,title VARCHAR(200) NOT NULL 
,complement VARCHAR(200) NOT NULL 
,content VARCHAR(2000) NOT NULL 
,PRIMARY KEY (id));ALTER TABLE articles
                ADD COLUMN createdAt DATETIME NOT NULL,
                ADD COLUMN updatedAt DATETIME NOT NULL;
                

/* ALTER TABLE */ 

ALTER TABLE articles 
ADD COLUMN id_layout INT NOT NULL 
, ADD COLUMN id_cover_image INT NOT NULL 
, ADD COLUMN id_section INT NOT NULL 
, ADD COLUMN short VARCHAR(130) NULL 
,ADD COLUMN title VARCHAR(200) NOT NULL 
,ADD COLUMN complement VARCHAR(200) NOT NULL 
,ADD COLUMN content VARCHAR(2000) NOT NULL 
