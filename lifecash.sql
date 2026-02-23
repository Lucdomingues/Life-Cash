USE api_data;

CREATE TABLE people (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(45) NOT NULL,
    last_name VARCHAR(45) NOT NULL,
    email VARCHAR(60) NOT NULL UNIQUE,
    phone VARCHAR(20) NOT NULL,
    active BOOLEAN NOT NULL
);

CREATE TABLE transactions (
     id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(60) NOT NULL,
    description VARCHAR(300),
    price DECIMAL(10,2) NOT NULL,
    type ENUM('despesa', 'renda') NOT NULL,
    person_id INT,
    CONSTRAINT fk_transaction_person_id FOREIGN KEY (person_id) REFERENCES people(id)
);

CREATE TABLE logs (
     id INT PRIMARY KEY AUTO_INCREMENT,
    event VARCHAR(100) NOT NULL,
    timestamp timestamp NOT NULL,
    type INT NOT NULL,
    person_id INT,
    CONSTRAINT fk_logs_person_id FOREIGN KEY (person_id) REFERENCES people(id)
);