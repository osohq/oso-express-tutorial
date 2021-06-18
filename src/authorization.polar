allow(user: User, "view", expense: Expense) if
    user.id = expense.user_id;

user_in_role(user: User, "accountant") if
    user.title = "Accountant";

user_in_role(user: User, "accountant") if
    user.title = "Senior Accountant";

allow(user: User, "view", _expense: Expense) if
    user_in_role(user, "accountant");
