import { redirect } from "react-router";
import { deleteItem } from "../helpers";
import {toast} from "react-toastify";

export async function LogoutAction(){
    deleteItem("username")
    toast.success("You've deleted your account!")
    return redirect("/")
}