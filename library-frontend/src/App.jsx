import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Recommend from "./components/Recommend";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(window.localStorage.getItem("books"));

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>

        <button onClick={() => setPage("books")}>books</button>

        {token && 
        <>
        <button onClick={() => setPage("add")}>add book</button>
        <button onClick={() => setPage("recommend")}>recommend</button>
        </>}


        {!token && <button onClick={() => setPage("login")}>login</button>}

        {token && <button onClick={() => setToken(null)}>logout</button>}
      </div>

      {page === "authors" && <Authors token={token} />}

      {page === "books" && <Books />}

      {page === "add" && <NewBook />}

      {page === "login" && <LoginForm setToken={setToken} />}

      {page === "recommend" && <Recommend />}
    </div>
  );
};

export default App;
