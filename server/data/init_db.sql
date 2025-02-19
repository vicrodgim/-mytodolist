
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS tasks;


CREATE TABLE users (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(50) UNIQUE NOT NULL,
    `email` VARCHAR(100) UNIQUE NOT NULL,
    `password` VARCHAR(255) NOT NULL
);

CREATE TABLE categories (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE tasks (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT,
    `completed` BOOLEAN DEFAULT FALSE,
    `priority` ENUM('low', 'medium', 'high') DEFAULT 'medium',
    `due_date` DATETIME,
    `user_id` INT NOT NULL,
    `category_id` INT,
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
    FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL
);


INSERT INTO categories (name) VALUES
(`Work`),
(`Coding`),
(`Health`),
(`Meetings`),
(`Goals`),
(`Daily`)
;
