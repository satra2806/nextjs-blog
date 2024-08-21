import { PrismaClient } from '@prisma/client';
import oracledb from 'oracledb';
import {connection} from '../../lib/connectionString'

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    // Use Prisma to fetch data
    const users = await prisma.user.findMany();

    // Example of raw Oracle query using oracledb
    // const connection = await oracledb.getConnection({
    //   user: 'user',
    //   password: 'password',
    //   connectionString: 'localhost:1521/xe'
    // });

    const result = await connection.execute(
      `SELECT * FROM some_table`
    );

    await connection.close();

    res.status(200).json({ users, rawResult: result.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to connect to database' });
  } finally {
    await prisma.$disconnect();
  }
}
