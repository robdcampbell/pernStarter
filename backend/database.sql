CREATE DATABASE authtodo;

-- set extension: uuid-ossp in database
-- cmd:  create extension if not exists "uuid-ossp";
-- UUID extension needs to be added for the UUID generate V4 to work properly 
CREATE TABLE users(
  user_id uuid DEFAULT uuid_generate_v4(),
  user_name VARCHAR(255) NOT NULL, 
  user_email VARCHAR(255) NOT NULL UNIQUE, 
  user_password VARCHAR(255) NOT NULL,
  PRIMARY KEY (user_id)
);

CREATE TABLE todos (
  todo_id SERIAL,
  user_id UUID, 
  description VARCHAR(255) NOT NULL,
  PRIMARY KEY (todo_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
)

-- Insert fake users

INSERT INTO users(user_name, user_email, user_password)
VALUES('johndoe', 'john@gmail.com', '123456');

-- Insert fake todos

INSERT INTO todos (description, user_id) VALUES('Wash some camels', '7748e1fe-28f5-4a83-ad30-eb6971276a37')