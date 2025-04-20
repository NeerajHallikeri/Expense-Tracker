import { Outlet, useLoaderData } from "react-router";
import { fetchLocalData } from "../helpers";

import wave from "../assets/wave.svg";
import NavBar from "../components/NavBar";

export function BaseLoader() {
  const username = fetchLocalData("username");
  return { username };
}

function Base() {
  const { username } = useLoaderData();
  console.log(`vnrnonvnnsrinir ${username}`);
  return (
    <div className="layout">
        <NavBar username={username}/>
      <main>
        <Outlet />
      </main>
      <img src={wave} />
    </div>
  );
}

export default Base;
