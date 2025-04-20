import { Form } from "react-router-dom"
import { UserPlusIcon } from "@heroicons/react/24/solid"
import illustration from "../assets/illustration.jpg"


function Intro(){
    return <div className="intro">
        <div>
            <h1>
                Take Control of <span className="accent">Your Money</span>
            </h1>
            <p>Personal budgeting is the secret to your financial success. Start your journey now!</p>
            <Form method="post">
            <input name="username" 
            type="text" 
            aria-label="Your Name"
            placeholder="Enter your name!"
            autoComplete="given-name"
            />
            <input type="hidden" name="_action" value="newUser"/>
            <button type="submit" className="btn btn--dark">
                <UserPlusIcon width={20}/>
                <span>Create Account</span>
            </button>
        </Form>
        </div>
        <img src={illustration} width={600}/>
       
    </div>
}

export default Intro