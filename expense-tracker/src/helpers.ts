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

interface deleteItemProps{
  key:string,
  id: any
}
export function deleteExpenseItem({key, id}:deleteItemProps){
  const exisitingData = fetchLocalData(key)
  if(id){
    const newData = exisitingData.filter((item: any) => item.id !== id);

    return localStorage.setItem(key, JSON.stringify(newData))
  }
  return localStorage.removeItem(key);

}

interface getAllMatchingItemsProps{
  category: string,
  key:string,
  value:string
}
export function getAllMatchingItems({category, key, value}:getAllMatchingItemsProps){
    const data = fetchLocalData(category)??[];
    return data.filter((item:any)=>item[key]=== value)

}

export const calculateSpentByBudget = (budgetid: string) => {
  const expenses = fetchLocalData("expenses")??[];
  const budgetSpent = expenses.reduce((acc: any,expense: any) => {
    if(expense.budgetId !== budgetid) return acc;
    return acc += expense.amount
  }, 0);

  return budgetSpent;
}

export const formatPercentage = (amount:any) => {
  return amount.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 0 
  })
}

export function formatCurrency(amount: string | number) {
  const numericAmount = typeof amount === "string" ? parseFloat(amount) : amount;
  return numericAmount.toLocaleString(undefined, {
    style: "currency",
    currency: "INR",
  });
}

export const formatDatetoLocaleString = (epoch:any) => new Date(epoch).toLocaleDateString();