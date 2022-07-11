CREATE TABLE blogs (
    id INTEGER PRIMARY KEY,
    author TEXT,
    url TEXT NOT NULL,
    title TEXT NOT NULL,
    likes INTEGER DEFAULT 0
);

insert into blogs (author, url, title) values ('Sample Author', 'www.com', 'Sample Title');

insert into blogs (author, url, title) values ('Testi Author', 'www.com', 'Paras Title');


select * from blogs;