import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

export interface ExpenseRecord {
  amount: number;
  description: string;
  user_id: number;
  id?: number; 
}

export interface UserRecord {
  id: number;
  email: string;
  title: string;
}

const getDb = async () => {
  return await open({
    filename: 'expenses.db',
    driver: sqlite3.Database
  });
};

export const queryDb = async (query: string, args: Array<string|number> = [], one=false) => {
  const db = await getDb();
  return one 
    ? await db.get(query, args) 
    : await db.all(query, args)
};

export const insertDb = async (query: string, args: Array<string|number> = []) => {
  const db = await getDb();
  const result = await db.run(query, args);
  return result.lastID;
}



