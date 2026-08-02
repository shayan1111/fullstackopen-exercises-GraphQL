import { useQuery } from "@apollo/client/react";
import { ALL_BOOKS, ALL_GENRES } from "../../queries";
import { useState } from "react";

const Books = () => {
  const [search, setSearch] = useState("");

  const booksResult = useQuery(ALL_BOOKS);
  const genresResult = useQuery(ALL_GENRES);

  if (booksResult.loading || genresResult.loading) return <div>Loading Books...</div>;

  // Book and genre List
  const books = booksResult.data?.allBooks;
  const genres = genresResult.data?.bookGenres;

  // First make a let variable. If the search is not empty, return books whose genre is the same as the search, otherwise return the whole list
  let booksToShow;
  if (search)
    booksToShow = books.filter((book) => book.genres.includes(search));
  else booksToShow = books;

  // For updating the books when a genre is clicked
  const selectBooksBasedOnGenres = async (genre) => {
    setSearch(genre);
    await booksResult.refetch()
  };

  // Update the books if 'all genres' was clicked
  const updateAllBooks = async () => {
    setSearch('')

    await booksResult.refetch()
    await genresResult.refetch()
  }

  return (
    <div>
      <h2>books</h2>

      {search && (
        <p>
          in genre <strong>{search}</strong>{" "}
        </p>
      )}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksToShow.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((genre) => (
        <button key={genre} onClick={() => selectBooksBasedOnGenres(genre)}>
          {genre}
        </button>
      ))}
      <button onClick={updateAllBooks}>all genres</button>
    </div>
  );
};

export default Books;
