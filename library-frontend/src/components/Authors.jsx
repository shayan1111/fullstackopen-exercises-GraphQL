import { useMutation, useQuery } from "@apollo/client/react";
import { ALL_AUTHORS, ADD_BIRTHYEAR } from "../../queries";
import { useState } from "react";

const Authors = ({ token }) => {
  // Fields for the name and born
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");
  const [addBirthYear] = useMutation(ADD_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const submit = async (event) => {
    event.preventDefault();

    await addBirthYear({ variables: { name: name, born: Number(born) } });

    setName("");
    setBorn("");
  };

  const birthYearForm = () => {
    return (
      <div>
        
        <h2>Set birthyear</h2>
        {/* Form */}
        <form onSubmit={submit}>
          <div>
            {/* Use a loop to consider the authors as <select> */}
            <label>
              name
              <select
                name="name"
                value={name}
                onChange={({ target }) => setName(target.value)}
              >
                {authors.map((author) => (
                  <option key={author.name} value={author.name}>
                    {author.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <label>
              born
              <input
                value={born}
                onChange={({ target }) => setBorn(target.value)}
              />
            </label>
          </div>
          <button>update author</button>
        </form>
      </div>
    );
  };

  const authorResult = useQuery(ALL_AUTHORS);

  if (authorResult.loading) return <div>Loading Authors...</div>;

  const authors = authorResult.data.allAuthors;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br></br>
      {token && birthYearForm()}
    </div>
  );
};

export default Authors;
