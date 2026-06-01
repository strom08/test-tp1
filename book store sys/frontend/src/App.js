import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_BOOKS, ADD_BOOK, DELETE_BOOK } from './queries';

const App = () => {
  const { loading, error, data } = useQuery(GET_BOOKS);
  const [addBook] = useMutation(ADD_BOOK, { refetchQueries: [{ query: GET_BOOKS }] });
  const [deleteBook] = useMutation(DELETE_BOOK, { refetchQueries: [{ query: GET_BOOKS }] });

  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [authorId, setAuthorId] = useState('65f1234567890123456789ab');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !genre) return alert('Please fill all fields');
    addBook({ variables: { title, genre, authorId } });
    setTitle('');
    setGenre('');
  };

  if (loading) return <p className="text-center mt-5">Loading Books...</p>;
  if (error) return <p className="text-danger text-center mt-5">Error: {error.message}</p>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Book Store Management System</h2>
      
      {/* Add Book Form */}
      <form onSubmit={handleSubmit} className="row g-3 mb-5 p-3 border rounded bg-light">
        <h4>Add New Book</h4>
        <div className="col-md-5">
          <input type="text" className="form-control" placeholder="Book Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="col-md-5">
          <input type="text" className="form-control" placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} />
        </div>
        <div className="col-md-2">
          <button type="submit" className="btn btn-primary w-100">Add Book</button>
        </div>
      </form>

      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>Title</th>
            <th>Genre</th>
            <th>Author</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.genre}</td>
              <td>{book.author ? book.author.name : 'Unknown'}</td>
              <td>
                <button className="btn btn-danger btn-sm" onClick={() => deleteBook({ variables: { id: book.id } })}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;