import { Request, Response } from 'express';
import { lookUp, Expense } from './expense';
import { authorize } from './authorization';

export const getExpense = async (req: Request, res: Response) => {
const id = req.params.expenseId;
   try {
     const expense = await lookUp(Number(id));
     const actor = req.app.locals.current_user;
     const result = await authorize(actor, 'view', expense);
     res.json(result);
   } catch (e) {
     console.error(e);
     res.sendStatus(403);
   }
};

export const postExpense = async (req: Request, res: Response) => {
  try {
    const expenseData = req.body;
    expenseData.user_id = expenseData.user_id || req.app.locals.current_user.id;
    if (!expenseData.user_id) throw "Missing user_id";
    const { amount, description, user_id } = expenseData;
    const expense = new Expense(expenseData);
    await expense.save();
    res.status(201).send(JSON.stringify(expense));
  } catch (e) {
    console.error(e);
    res.sendStatus(400);
  }
};
