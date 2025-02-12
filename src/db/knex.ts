import knex from 'knex';
import { config } from 'dotenv';
import path from 'path';
import knexConfig from './knexfile';

interface KnexConfig {
  [key: string]: object;
}

config({ path: path.resolve(__dirname, '../../.env') });

const environment = process.env.NODE_ENV || 'development';
const connection = knex((knexConfig as KnexConfig)[environment]);

export default connection;