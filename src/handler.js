const { nanoid } = require('nanoid');
const books = require('./books');

//Add Book
const addBookHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  // Validate Input
  if (!name) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    }).code(400);
  }
  if (readPage > pageCount) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    }).code(400);
  }

  // Init Book
  const id = nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };
  //Add Book
  books.push(newBook);

//Check if book is added
  const isSuccess = books.filter((b) => b.id === id).length > 0;
  if (isSuccess) {
    return h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    }).code(201);
  }
    
  // If book is failed to be added
  return h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  }).code(500);
};

const getAllBooksHandler = (request, h) => {
  const {
    const {name, reading, finished} = request.query;

  if (!name && !reading && !finished) {
    const booksAll = books.map((b) => ({
      id: b.id,
      name: b.name,
      publisher: b.publisher,
    }));
    return h.response({
      status: 'success',
      data: {
        books: booksAll,
      },
    }).code(200);
  }

  const booksFiltered = books.filter(({ name: bookName, reading: bookReading, finished: bookFinished }) => {
    if (name && !bookName.toLowerCase().includes(name.toLowerCase())) {
      return false;
    }

    if (reading !== undefined && (reading === '0' ? bookReading : !bookReading)) {
      return false;
    }

    if (finished !== undefined && (finished === '0' ? bookFinished : !bookFinished)) {
      return false;
    }

    return true;
  });
  const mappedBooks = booksFiltered.map(
    (book) => ({
      id: book.id,
      name: book.name,
      publisher: book.publisher,
    }),
  );
  return h.response({
    status: 'success',
    data: {
      books: mappedBooks,
    },
  }).code(200);
};

const getBookByIdHandler = (request, h) => {
  const { id } = request.params;

  const book = books.find((book) => book.id === id);
  if (book) {
    return h.response({
      status: 'success',
      data: {book},
    });
  }

  return h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  }).code(404);
};

const editBookByIdHandler = (request, h) => {
  const { id } = request.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  // Validate input
  if (!name) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    }).code(400);
  }
  if (readPage > pageCount) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    }).code(400);
  }

  //Find book
  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    // Update book.
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt: new Date().toISOString(),
    };
    return h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    }).code(200);
  }
  // If book is not found.
  return h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  }).code(404);
};

const deleteBookByIdHandler = (request, h) => {
  const { id } = request.params;

  // Find book.
  const index = books.findIndex((book) => book.id === id);
 
  if (index !== -1) {
    // Delete book.
    books.splice(index, 1);

    return h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
  }

  // If book is not found.
  return h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  }).code(404);
};

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
};
