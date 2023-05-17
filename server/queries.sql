CREATE SCHEMA `TodosAPI`;
USE TodosAPI;

# todos' SQL TABLE CREATION
CREATE TABLE `todos` (
	`id` int unsigned NOT NULL AUTO_INCREMENT,
	`title` varchar(255) NOT NULL,
	`description` varchar(1024) NOT NULL,
	`status` enum('PENDING','DOING','COMPLETED','CANCELLED') NOT NULL DEFAULT 'PENDING',
	PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

SHOW TABLES;
SHOW CREATE TABLE todos;
SHOW COLUMNS FROM todos;

# CREATE
INSERT INTO todos (title, description)
VALUES ("Feed the cat", "Feed my cat");

# READ
SELECT * FROM todos ORDER BY id DESC;
SELECT * FROM todos WHERE id=4;

# UPDATE
UPDATE todos
SET description="Feeding my cat", status="DOING"
WHERE id=4;

# DELETE
DELETE FROM todos WHERE id=4;
