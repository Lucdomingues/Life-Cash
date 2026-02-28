USE api_data;

CREATE TABLE people (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(45) NOT NULL,
    last_name VARCHAR(45) NOT NULL,
    email VARCHAR(60) NOT NULL UNIQUE,
    phone VARCHAR(20) NOT NULL,
    deleted_at DATETIME NULL
) ENGINE=InnoDB;

CREATE TABLE transactions (
     id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(60) NOT NULL,
    description VARCHAR(300),
    price DECIMAL(10,2) NOT NULL,
    type ENUM('despesa', 'renda') NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    person_id INT NOT NULL,
    CONSTRAINT fk_transaction_person_id FOREIGN KEY (person_id) REFERENCES people(id)
)ENGINE=InnoDB;

CREATE TABLE logs (
     id INT PRIMARY KEY AUTO_INCREMENT,
    event VARCHAR(100) NOT NULL,
    timestamp timestamp NOT NULL,
    entity VARCHAR(50) NOT NULL,
    person_id INT,
    CONSTRAINT fk_logs_person_id FOREIGN KEY (person_id) REFERENCES people(id)
) ENGINE=InnoDB;