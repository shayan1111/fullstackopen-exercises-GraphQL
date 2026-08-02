import { useState } from "react";
import { LOGIN_USER } from "../../queries";
import { useMutation } from "@apollo/client/react";

const LoginForm = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login] = useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      const token = data.login.value;
      setToken(token);
      localStorage.setItem("books", token);
    },
    onError: (error) => {
      console.error(error.message);
    },
  });

  const onSubmit = async (event) => {
    event.preventDefault();

    await login({
      variables: { username, password },
    });

    setUsername("");
    setPassword("");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>
          username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
        <br></br>
        <label>
          password
          <input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
        <br></br>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
