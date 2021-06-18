import express, { Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';
import { lookUp, Expense } from './expense';
import { lookUp as lookUpUser, User } from './user'; 
import { authorize } from './authorization';

const app = express();
const parser = json();

const requestUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const email = req.header('user');
    if (email) {
      const currentUser = await lookUpUser(email);
      req.app.locals.current_user = new User(currentUser);
    }
    next();
  } catch (e) {
    console.error(e);
    res.status(401).send("User not found");
  }
};

app.use(requestUser);

app.get('/expenses/:expenseId', async (req, res) => {
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
});

app.post('/expenses', parser, async (req: Request, res: Response) => {
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
});

app.listen(3000, () => {
  console.log('The application is listening on port 3000!');
})
