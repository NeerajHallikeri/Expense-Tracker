import { createBrowserRouter, RouterProvider } from "react-router";
import Dashboard, { DashboardAction, DashboardLoader } from "./pages/Dashboard";
import Base, { BaseLoader } from "./layouts/Base";
import { LogoutAction } from "./actions/LogoutAction";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Error from './pages/Error';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Base />,
    loader: BaseLoader,
    children: [
      {
        path: "/",
        element: <Dashboard />,
        loader: DashboardLoader,
        action: DashboardAction,
        errorElement: <Error/>
        
      },
      {
        path: '/logout',
        element: <p>Logged Out Successfully!</p>,
        action: LogoutAction
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
