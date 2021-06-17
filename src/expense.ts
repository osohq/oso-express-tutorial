import { queryDb, insertDb, ExpenseRecord } from './db';

export class Expense {
  amount: number;
  description: string;
  user_id: number;
  id?: number; 

  constructor({amount, description, user_id, id} : ExpenseRecord) {
    this.amount = amount;
    this.description = description;
    this.user_id = user_id;
    if (id) this.id = id;
  }

  async save ()  {
    const now = Date.now();
    const id = await insertDb(
      ` 
            INSERT INTO expenses (amount, description, user_id, created_at, updated_at)
                VALUES(?, ?, ?, ?, ?) 
        `,
      [
        this.amount,
        this.description,
        this.user_id,
        now,
        now,
      ],
    );
    this.id = id;
  }

}

export const lookUp = async (id: number) => {
  const record = await queryDb(
    "select id, amount, description, user_id from expenses where id = ?",
    [id],
    true);
  if (!record) throw "Not found";
  return new Expense(record); 
}
