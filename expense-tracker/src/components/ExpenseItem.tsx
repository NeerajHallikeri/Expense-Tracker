import { Link, useFetcher } from "react-router";
import { formatCurrency, formatDatetoLocaleString, getAllMatchingItems } from "../helpers";
import { TrashIcon } from "@heroicons/react/24/solid";

interface ExpenseItemProps {
  expense: any;
  showBudget?: boolean
}
function ExpenseItem({ expense, showBudget = true}: ExpenseItemProps) {
    const fetcher = useFetcher();
    const budget = getAllMatchingItems({
        category: "budgets",
        key: "id",
        value: expense.budgetId
    })[0];
  return (
    <>
      <td>{expense.name}</td>
      <td>{formatCurrency(expense.amount)}</td>
      <td>{formatDatetoLocaleString(expense.createdAt)}</td>
      {showBudget && <td><Link 
      to={`/budget/${budget.id}`}
      style={{
        ["--accent" as any]: budget.color
      }}
      >{budget.name}</Link></td>}
      <td>
        <fetcher.Form method="post">
            <input type="hidden" name="_action" value='deleteExpense' />
            <input type="hidden" name="expenseId" value={expense.id} />
            <button type="submit" className="btn btn--warning">
                <TrashIcon width={20}/>
            </button>

        </fetcher.Form>
      </td>
    </>
  );
}

export default ExpenseItem;
