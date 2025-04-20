import { HomeIcon, ArrowUturnLeftIcon } from "@heroicons/react/24/outline"
import { Link, useNavigate } from "react-router"
import { useRouteError } from "react-router"

function Error(){
    const error:any = useRouteError()
    const navigate = useNavigate()
    return (
        <div className="error">
            <h1>Uh oh! We've got a problem.</h1>
            <p>{error.message || error.statusText}</p>
            <div className="flex-md">
                <button className="btn btn--dark" onClick={()=>{navigate(-1)}}>
                    <ArrowUturnLeftIcon width={20}/>
                    <span>Go Back</span>
                    </button>
                <Link to="/" className='btn btn--dark'>
                <HomeIcon width={20}/>
                <span>Go to Home</span>
                </Link>
            </div>
        </div>
    )
}

export default Error