import { drizzle } from 'drizzle-orm/libsql/node';
import { createClient } from '@libsql/client';
import env from '@/config/env.ts';


const client = createClient({ url: env.DB_FILE_NAME! });

const db = drizzle({ client, casing: 'snake_case' });

export default db;
