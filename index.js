//  1. Realizar la conexión con PostgreSQL con la clase Client.
const { Client } = require('pg');
require('dotenv').config();
const config = {
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    port: process.env.PG_PORT,
}

//console.log('process.env :>> ', process.env);

// Constantes y Process Argv para Captura de Comandos en la Terminal.
const argumentos = process.argv.slice(2);
const proceso = argumentos[0];
const nombre = argumentos[1];
const rutId = argumentos[2];
const curso = argumentos[3];
const nivel = argumentos[4];
const rutConEli = argumentos[1];

//  2. Crear una función asíncrona para registrar un nuevo estudiante en la base de datos.
const nuevo = async ({ nombre, rutId, curso, nivel }) => {
    const client = new Client(config);
    try {
        client.connect();
        const alumno = `
        INSERT INTO estudiante (nombre, rut, curso, nivel) 
        VALUES ('${nombre}', '${rutId}', '${curso}', '${nivel}')
        RETURNING *`;
        const res = await client.query(alumno);
        console.log(`Estudiante ${nombre} agregado con exito`);
        console.log(res.rows);
    } catch (error) {
        console.log('error :>> ', error);
    }
    client.end();
};

//  3. Crear una función asíncrona para obtener por consola el registro de un estudiante por medio de su rut.
const rut = async ({ rutConEli }) => {
    const client = new Client(config);
    try {
        client.connect();
        const alumno = `
        SELECT nombre, rut, curso, nivel
        FROM estudiante
        WHERE rut = '${rutConEli}'`;
        const res = await client.query(alumno);
        console.log(res.rows);
    } catch (error) {
        console.log('error :>> ', error);
    }
    client.end();
};

//  4. Crear una función asíncrona para obtener por consola todos los estudiantes registrados.
const consulta = async () => {
    const client = new Client(config);
    try {
        client.connect();
        const alumno = `
        SELECT nombre, rut, curso, nivel
        FROM estudiante`;
        const res = await client.query(alumno);
        console.log('Registro actual: ', res.rows);
    } catch (error) {
        console.log('error :>> ', error);
    }
    client.end();
};

//  5. Crear una función asíncrona para actualizar los datos de un estudiante en la base de datos.
const editar = async ({ nombre, rutId, curso, nivel }) => {
    const client = new Client(config);
    try {
        client.connect();
        const alumno = `
        UPDATE estudiante SET
        nombre = '${nombre}', 
        rut = '${rutId}',
        curso = '${curso}',
        nivel = '${nivel}' 
        WHERE rut = '${rutId}'
        RETURNING *`;
        const res = await client.query(alumno);
        console.log(`Estudiante ${nombre} editado con exito`);
        console.log(res.rows);
    } catch (error) {
        console.log('error :>> ', error);
    }
    client.end();
};

//  6. Crear una función asíncrona para eliminar el registro de un estudiante de la base de datos.
const eliminar = async ({ rutConEli }) => {
    const client = new Client(config);
    try {
        client.connect();
        const alumno = `
        DELETE FROM estudiante
        WHERE rut = '${rutConEli}'`;
        const res = await client.query(alumno);
        console.log(`Registro de estudiante con Rut ${rutConEli} fue eliminado con exito`);
        console.log('Cantidad de Registros Afectados', res.rowCount);
    } catch (error) {
        console.log('error :>> ', error);
    }
    client.end();
};

// Ingresos, Consultas y Eliminacion de Estudiantes.
const main = async () => {
    const est = {
        nombre, rutId, curso, nivel
    }
    const est1 = {
        rutConEli
    }
    if (proceso == 'nuevo') {
        await nuevo(est);
    }
    else if (proceso == 'rut') {
        await rut(est1);
    }
    else if (proceso == 'consulta') {
        await consulta(est);
    }
    else if (proceso == 'editar') {
        await editar(est);
    }
    else if (proceso == 'eliminar') {
        await eliminar(est1);
    }
    else {
        console.log("no existe");
    };
};

main(); 