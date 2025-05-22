import { toast } from "react-toastify";
import Table from "../components/Table";
import { deleteExpenseItem, fetchLocalData } from "../helpers";
import { useLoaderData } from "react-router";

export function ExpensesLoader() {
  const expenses = fetchLocalData("expenses");
  return { expenses };
}

export async function ExpensesAction({request}:any){
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
}

function Expenses() {
  const { expenses } = useLoaderData();

  return <div className="grid-lg">
    <h1>All Expenses</h1>
    {
        expenses && expenses.length > 0 ? 
        (
            <div className="grid-md">
                <h2>Recent Expenses <small>(total {expenses.length})</small></h2>
                <Table expenses={expenses}></Table>
            </div>
        ):
        <p>No Expenses to show</p>
    }
  </div>;
}

export default Expenses;
