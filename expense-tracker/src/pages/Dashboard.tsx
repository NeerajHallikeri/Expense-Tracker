import { useLoaderData } from "react-router";
import { createBudget, createExpense, fetchLocalData } from "../helpers";
import Intro from "../components/Intro";
import { toast } from "react-toastify";
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";

export function DashboardLoader() {
  const username = fetchLocalData("username");
  const budgets = fetchLocalData("budgets");
  return { username, budgets };
}

export async function DashboardAction({ request }: any) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  if (_action === "newUser") {
    try {
      localStorage.setItem("username", JSON.stringify(values.username));
      return toast.success(`Hi ${values.username}, Welcome`);
    } catch (e) {
      throw new Error("There was a problem creating your account.");
    }
  }

  if (_action === "createBudget") {
    try {
      createBudget({
        name: values.newBudget,
        amount: values.newBudgetAmount,
      });
      return toast.success("Budget Created!");
    } catch (e) {
      throw new Error("There was a problem creating your budget.");
    }
  }

  if(_action === 'createExpense'){
    try {
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget

      })
      return toast.success(`Expense ${values.newExpense} Created!`);
    } catch (e) {
      throw new Error("There was a problem creating your expense.");
    }
  }

  console.log(values);
}

function Dashboard() {
  const { username, budgets } = useLoaderData();
  console.log(`vnrnonvnnsrinir ${username}`);
  return (
    <>
      {username ? (
        <div className="dashboard">
          <h1>
            Welcome back, <span className="accent">{username}</span>
          </h1>
          <div className="grid-sm">
            {budgets && budgets.length > 0 ? (
              <div className="grid-lg">
                <div className="flex-lg">
                  <AddBudgetForm />
                  <AddExpenseForm budgets = {budgets}/>
                </div>
              </div>
            ) : (
              <div className="grid-sm">
                <p>
                  Personal budgeting is the secret to financial freedom
                </p>
                <p>Create a Budget to get started!</p>
                <AddBudgetForm/>
              </div>
            )}
          </div>
        </div>
      ) : (
        <Intro />
      )}
    </>
  );
}

export default Dashboard;
