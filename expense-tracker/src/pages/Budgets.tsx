import { useLoaderData } from "react-router";
import { createExpense, deleteExpenseItem, getAllMatchingItems } from "../helpers";
import BudgetItem from "../components/BudgetItem";
import AddExpenseForm from "../components/AddExpenseForm";
import Table from "../components/Table";
import { toast } from "react-toastify";

export async function BudgetLoader({ params }: any) {
  const budget = await getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: params.id,
  })[0];

  const expenses = await getAllMatchingItems({
    category: "expenses",
    key: "budgetId",
    value: params.id,
  })    ;

  if (!budget) {
    throw new Error("The budget you are trying to find does not exist");
  }

  return { budget, expenses };
}

export async function BudgetsAction({request}:any){
    const data = await request.formData();
    const { _action, ...values } = Object.fromEntries(data);

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
}

function Budgets() {
  const { budget, expenses } = useLoaderData();
  return (
    <div className="grid-lg"
    style={{
        ["--accent" as any]: budget.color
      }}>
      <h1 className="h2">
        <span className="accent">{budget.name}</span> Overview
      </h1>
      <div className="flex-lg">
        <BudgetItem budget={budget} showDelete = {true}/>
        <AddExpenseForm budgets={[budget]}/>
      </div>
      {
        expenses && expenses.length>0 && (
            <div className="grid-md">
                <h2>
                    <span className="accent">{budget.name}</span> Expenses
                </h2>
                <Table expenses = {expenses} showBudget = {false}></Table>
            </div>
        )
      }
    </div>
  );
}

export default Budgets;
