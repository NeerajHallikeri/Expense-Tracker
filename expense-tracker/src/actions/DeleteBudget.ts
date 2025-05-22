import { toast } from "react-toastify"
import { deleteExpenseItem, deleteItem, getAllMatchingItems } from "../helpers"
import { redirect } from "react-router-dom"

interface DeleteBudgetProps{
    params: any
}
function DeleteBudget({params}:DeleteBudgetProps){
    try{
        deleteExpenseItem({
            key: "budgets",
            id: params.id
        })

        const associatedExpenses = getAllMatchingItems(
            {
                category: 'expenses',
                key: 'budgetId',
                value: params.id
            }
        )

        associatedExpenses.forEach((expense:any)=>{
            deleteExpenseItem({
                key:"expenses",
                id:expense.id
            })
        })

        toast.success("Budget deleted succesfully")
    }
    catch(e){
        throw new Error("There was a problem deleting your budget!")
    }

    return redirect('/');
    
}

export default DeleteBudget