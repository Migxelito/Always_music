psql -U postgres

CREATE DATABASE alwaysmusic;

\c alwaysmusic

CREATE TABLE estudiante (
    rut VARCHAR(15) PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,    
    curso VARCHAR(20) NOT NULL,
    nivel INT NOT NULL
);