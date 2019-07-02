CREATE TYPE acctype as ENUM('user','admin');

CREATE TABLE account(
	id SERIAL,
	email varchar(100),
	type acctype,
	UNIQUE(id),
	PRIMARY KEY(email)
);

INSERT INTO account(email,type) VALUES
('johnson_tan99@hotmail.com','admin');

CREATE TABLE related(
	id int,
	femail varchar(100),
	PRIMARY KEY(id,femail),
	FOREIGN KEY (id) REFERENCES account(id),
	FOREIGN KEY (femail) REFERENCES account(email)
);

CREATE TABLE movies(
	title varchar(100),
	year date,
	stars text,
	length time,
	PRIMARY KEY(title,year)
);

CREATE TABLE reviews(
	id int,
	mtitle varchar(100),
	year date,
	comments text DEFAULT '',
	ratings float CHECK(ratings>=0 and ratings<=5),
	PRIMARY KEY(id,mtitle),
	FOREIGN KEY(id) REFERENCES account(id),
	FOREIGN KEY(mtitle,year) REFERENCES movies(title,year)
);

CREATE TABLE users(
	fname varchar(25),
	lname varchar(25),
	email varchar(100),
	color varchar(25),
	PRIMARY KEY (email),
	FOREIGN KEY (email) REFERENCES account(email)
);