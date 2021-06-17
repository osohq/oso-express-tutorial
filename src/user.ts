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
  const record = await queryDb(
    "select id, email, title from users where id = ?", 
    [id], 
    true
  );
  if (!record) throw "Not found";
  return new User(record);
};

export const lookUp = async (email: string) => {
  const record = await queryDb(
    "select id, email, title from users where email = ?", 
    [email], 
    true
  );
  if (!record) throw "Not found";
  return new User(record);
};
