import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef } from "react";
import { useFetcher } from "react-router";

function AddExpenseForm({ budgets }: any) {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";
  const formRef = useRef<HTMLFormElement>(null);
  const focusRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current?.reset();
      focusRef.current?.focus();
      console.log("it is executing");
    }
  }, [isSubmitting]);

  return (
    <div className="form-wrapper">
      <h2 className="h3">
        Add New{" "}
        <span className="accent">
          {budgets.length === 1 && `${budgets.map((budg: any) => budg.name)}`}
        </span>{" "}
        Expense
      </h2>
      <fetcher.Form method="post" className="grid-sm" ref={formRef}>
        <div className="expense-inputs">
          <div className="grid-xs">
            <label htmlFor="newExpense">Expense Name</label>
            <input
              type="text"
              name="newExpense"
              id="newExpense"
              placeholder="e.g., Coffee"
              ref={focusRef}
              required
            />
          </div>
          <div className="grid-xs">
            <label htmlFor="newExpenseAmount">Amount</label>
            <input
              type="number"
              step={0.01}
              inputMode="decimal"
              name="newExpenseAmount"
              id="newExpenseAmount"
              placeholder="e.g., ₹500.0"
              required
            />
          </div>
        </div>
        <div className="grid-xs" hidden={budgets.length === 1}>
          <label htmlFor="newExpenseBudget">Budget Category</label>
          <select name="newExpenseBudget" id="newExpenseBudget" required>
            {budgets
              .sort((a: any, b: any) => {
                a.createdAT - b.createdAt;
              })
              .map((budget: any) => {
                return (
                  <option key={budget.id} value={budget.id}>
                    {budget.name}
                  </option>
                );
              })}
          </select>
        </div>
        <input
          type="text"
          hidden={true}
          name="_action"
          value={"createExpense"}
        />
        <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
          {isSubmitting ? (
            <span>Submitting...</span>
          ) : (
            <>
              <PlusCircleIcon width={20} />
              <span>Add Expense</span>
            </>
          )}
        </button>{" "}
      </fetcher.Form>
    </div>
  );
}

export default AddExpenseForm;
