-- --
-- INSERT INTO books(id, book_name, isbn)
-- VALUES (1, "Thinking Fast", "1234");
-- INSERT INTO books(id, book_name, isbn)
-- VALUES (2, "Harry Potter", "1235");
-- INSERT INTO books(id, book_name, isbn)
-- VALUES (3, "Madame Bovary", "1010");

-- -- Create and Populate the New Tables
-- /* create table authors(
-- id INT NOT NULL AUTO_INCREMENT,
-- author_first_name VARCHAR(20) NOT NULL,
-- author_last_name VARCHAR(20) NOT NULL, PRIMARY KEY (id)); */
-- INSERT INTO authors(id, author_first_name, author_last_name)
-- VALUES (1, "Daniel", "Kanheman");
-- INSERT INTO authors(id, author_first_name, author_last_name)
-- VALUES (2, "Gustav", "Flaubert");
-- INSERT INTO authors(id, author_first_name, author_last_name)
-- VALUES (3, "Joanne K.", "Rowling");
-- INSERT INTO authors(id, author_first_name, author_last_name)
-- VALUES (4, "Amos", "Tversky");


-- -- Create and Populate the “authorship” table
-- /* create table authorship(
-- id_book INT NOT NULL,
-- id_author INT NOT NULL,
-- PRIMARY KEY (id_book, id_author)); */
-- INSERT INTO authorship(id_book, id_author) VALUES (3,1);
-- INSERT INTO authorship(id_book, id_author) VALUES (3,4);
-- INSERT INTO authorship(id_book, id_author) VALUES (5,3);
-- INSERT INTO authorship(id_book, id_author) VALUES (6,2);