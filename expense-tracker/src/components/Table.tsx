import ExpenseItem from "./ExpenseItem";

interface TableProps{
    expenses: any
    showBudget?: boolean
}
function Table({expenses, showBudget = true}: TableProps){
    return <div className="table">
        <table>
            <thead>
                <tr>
                    {
                        [
                            'Name',
                            'Amount', 
                            'Date', 
                            showBudget?'Budget':"",
                            ""
                        ].map((i:any, index:any)=>(
                            <th key={index}>{i}</th>
                        ))
                    }
                </tr>
            </thead>
            <tbody>
                {
                    expenses.map((expense:any)=>{
                       return <tr key={expense.id}>
                            <ExpenseItem expense = {expense} showBudget = {showBudget}/>
                        </tr>
                    })
                }
            </tbody>
        </table>
    </div>
}

export default Table;