import { createBrowserRouter, RouterProvider } from "react-router";
import Dashboard, { DashboardAction, DashboardLoader } from "./pages/Dashboard";
import Base, { BaseLoader } from "./layouts/Base";
import { LogoutAction } from "./actions/LogoutAction";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Error from './pages/Error';
import Expenses, { ExpensesAction, ExpensesLoader } from "./pages/Expenses";
import Budgets, { BudgetLoader, BudgetsAction } from "./pages/Budgets";
import DeleteBudget from './actions/DeleteBudget';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Base />,
    loader: BaseLoader,
    errorElement: <Error/>,
    children: [
      {
        path: "/",
        element: <Dashboard />,
        loader: DashboardLoader,
        action: DashboardAction,
        errorElement: <Error/>
        
      },
      {
        path:"/expenses",
        element: <Expenses/>,
        loader:ExpensesLoader,
        action:ExpensesAction,
        errorElement:<Error/>
      },
      {
        path:"/budget/:id",
        element: <Budgets/>,
        loader: BudgetLoader,
        errorElement: <Error/>,
        action:BudgetsAction,
        children: [
          {
            path: 'delete',
            action: DeleteBudget
          }

        ]
      },
      {
        path: '/logout',
        element: <p>Logged Out Successfully!</p>,
        action: LogoutAction,
        errorElement: <Error/>
      }
    ]
  },
  
]);
function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer/>
    </div>
  );
}

export default App;
