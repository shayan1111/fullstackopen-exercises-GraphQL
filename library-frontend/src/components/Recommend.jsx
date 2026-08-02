import { useQuery } from "@apollo/client/react";
import { FAVORITE_GENRE, ALL_BOOKS } from "../../queries";

const Recommend = () => {
  const favoriteGenreResult = useQuery(FAVORITE_GENRE);
  const booksResult = useQuery(ALL_BOOKS);

  if (favoriteGenreResult.loading || booksResult.loading)
    return <h2>Loading favorite genre...</h2>;

  const favoriteGenre = favoriteGenreResult.data?.favoriteGenre;
  const books = booksResult.data?.allBooks;

  const favoriteBooks = books?.filter((book) =>
    book.genres.includes(favoriteGenre),
  );

  return (
    <div>
      <h2>recommendations</h2>

      <p>
        books in your favorite genre <strong>{favoriteGenre}</strong>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {favoriteBooks?.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommend;
