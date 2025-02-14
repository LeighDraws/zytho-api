import dotenv from 'dotenv';

dotenv.config();

const { Pool } = require('pg')

export const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnautorized: false }
});

