import { redirect } from "react-router";
import { deleteItem } from "../helpers";
import {toast} from "react-toastify";

export async function LogoutAction(){
    deleteItem("username")
    deleteItem("expenses")
    deleteItem("budgets")
    toast.success("You've deleted your account!")
    return redirect("/")
}