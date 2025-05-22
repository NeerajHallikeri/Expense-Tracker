import { Form } from "react-router-dom";
import {
  calculateSpentByBudget,
  formatCurrency,
  formatPercentage,
} from "../helpers";
import { Link } from "react-router";
import { BanknotesIcon, TrashIcon } from "@heroicons/react/24/solid";

interface BudgetItemProps {
  budget: any;
  showDelete?: boolean;
}
function BudgetItem({ budget, showDelete = false }: BudgetItemProps) {
  const spent = calculateSpentByBudget(budget.id);

  return (
    <div
      className="budget"
      style={{
        ["--accent" as any]: budget.color,
      }}
    >
      <div className="progress-text">
        <h3>{budget.name}</h3>
        <p>{formatCurrency(budget.amount)} Budgeted</p>
      </div>
      <progress max={budget.amount} value={spent}>
        {formatPercentage(spent / budget.amount)}
      </progress>
      {/* <small>{formatPercentage(spent/budget.amount)}</small> */}
      <div className="progress-text">
        <small>{formatCurrency(spent)} spent</small>
        <small>{formatCurrency(budget.amount - spent)} remaining</small>
      </div>
      {showDelete ? (
        <div className="flex-sm">
        <Form 
          method="post"
          action="delete"
          onSubmit={(event) => {
            if(!confirm("Are you sure you want to delete this budget permanently?")){
              event.preventDefault
            }
          }}>
          <button type="submit" className="btn">
            <span>Delete Budget</span>
            <TrashIcon width={20}/>
          </button>
        </Form>
        </div>
      ) : (
        <div className="flex-sm">
          <Link to={`/budget/${budget.id}`} className="btn">
            <span>View Details</span>
            <BanknotesIcon width={20} />
          </Link>
        </div>
      )}
    </div>
  );
}

export default BudgetItem;
