import { Link, useLoaderData } from "react-router";
import { createBudget, createExpense, deleteExpenseItem, deleteItem, fetchLocalData } from "../helpers";
import Intro from "../components/Intro";
import { toast } from "react-toastify";
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";

export function DashboardLoader() {
  const username = fetchLocalData("username");
  const budgets = fetchLocalData("budgets");
  const expenses = fetchLocalData("expenses");
  return { username, budgets, expenses };
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

  if(_action === 'deleteExpense'){
    try {
      deleteExpenseItem({
        key: "expenses",
        id: values.expenseId

      })
      return toast.success(`Expense Deleted!`);
    } catch (e) {
      throw new Error("There was a problem deleting your expense.");
    }
  }

  console.log(values);
}

function Dashboard() {
  const { username, budgets, expenses } = useLoaderData();
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
                <h2>Exisiting Budgets</h2>
                <div className="budgets">
                    {
                      budgets.map((budget:any)=>{
                        console.log(budget);
                          return <BudgetItem
                          
                          budget = {budget}/>
                      })
                    }
                </div>
                {
                  expenses && expenses.length > 0 && (
                    <div className="grid-md">
                      <h2>Recent Expenses</h2>
                      <Table
                      expenses = {expenses.sort((a:any,b:any)=>{
                        b.createdAt - a.createdAt
                      }).slice(0,8)}
                      />
                      {
                        expenses.length > 8 && (
                          <Link
                          to='expenses'
                          className="btn btn--dark"
                          >View All Expenses</Link>
                        )
                      }
                    </div>
                  )
                }
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
