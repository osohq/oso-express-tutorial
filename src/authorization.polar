allow(user: User, "view", expense: Expense) if
    user.id = expense.user_id;
