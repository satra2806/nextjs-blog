import oracledb from 'oracledb';


export  const connection = await oracledb.getConnection({
    user: 'user',
    password: 'password',
    connectionString: 'localhost:1521/xe'
  });