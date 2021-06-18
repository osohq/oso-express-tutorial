import express, { Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';
import { lookUp, Expense } from './expense';
import { lookUp as lookUpUser, User } from './user'; 
import { getExpense, postExpense } from './controllers';

const app = express();
const parser = json();

const requestUserMiddleware = async (req: Request, res: Response, next: NextFunction) => {
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

app.use(requestUserMiddleware);

app.get('/expenses/:expenseId', getExpense);

app.post('/expenses', parser, postExpense);

app.listen(3000, () => {
  console.log('The application is listening on port 3000!');
})
