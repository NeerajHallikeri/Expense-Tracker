import { NavLink } from "react-router";
import logomark from "../assets/logomark.svg";
import { Form } from "react-router";
import {TrashIcon} from '@heroicons/react/24/solid'

interface NavBarProps {
  username: string;
}
function NavBar({ username }: NavBarProps) {
  return (
    <nav>
      <NavLink to="/" aria-label="Go to home">
        <img src={logomark} height={30} />
        <span>HomeBudget</span>
      </NavLink>
      {username && (
        <Form
          method="post"
          action="/logout"
          onSubmit={(event) => {
            if (!confirm("Deleter User and Data?")) {
              event.preventDefault();
            }
          }}
        >
          <button className="btn btn--warning" type="submit">
            <span>Delete User</span>
            <TrashIcon width={20}/>
          </button>
        </Form>
      )}
    </nav>
  );
}

export default NavBar;
