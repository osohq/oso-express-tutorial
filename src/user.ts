import { queryDb, UserRecord } from './db';

export class User {
  id: number;
  email: string;
  title: string;

  constructor({id, email, title}: UserRecord) {
    this.id = id;
    this.email = email;
    this.title = title;
  }
}

export const get = async (id: number) => {
  const records = await queryDb(
    "select id, email, title from users where id = ?", 
    [id]
  );
  if (records.length) throw "Not found";
  return new User(records[0]);
};

export const lookUp = async (email: string) => {
  const records = await queryDb(
    "select id, email, title from users where email = ?", 
    [email]
  );
  if (!records.length) throw "Not found";
  return new User(records[0]);
};
