export const fetchLocalData = (key: string) => {
    const item = localStorage.getItem(key);
    console.log("📦 Retrieved item from localStorage:", item);
  
    if (!item || item === "null") return null;
  
    try {
      return JSON.parse(item);
    } catch (e) {
      console.error("❌ JSON parse error:", e);
      return null;
    }
  };
  
function generateRandomColor(){
  const exisitingBudgetLength = fetchLocalData('budgets')?.length??0;
  return `${exisitingBudgetLength*34} 65% 50%`
}

interface createBudgetProps{
  name: string,
  amount: string
}
export const createBudget = ({name, amount}:createBudgetProps) => {
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    color: generateRandomColor()
  }
  const existingBudgets =  fetchLocalData("budgets") ?? []
  return localStorage.setItem("budgets", JSON.stringify([...existingBudgets, newItem]))
}
  
export const deleteItem = (key: string) => {
    return localStorage.removeItem(key);
}

interface createExpenseProps{
  name: string,
  amount: string,
  budgetId: string
}
export function createExpense({name,amount, budgetId}:createExpenseProps){
  const newItem = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    amount: +amount,
    budgetId: budgetId
  }
  const exisitingExpenses =  fetchLocalData("expenses") ?? []
  return localStorage.setItem("expenses", JSON.stringify([...exisitingExpenses, newItem]))
} 