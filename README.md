# Bookshelf-API
Tugas Akhir Belajar Membuat Aplikasi Back-End Pemula
# Bookshelf API

## Data

API ini akan menyimpan data buku dengan atribut sebagai berikut:

{
    "id": "Qbax5Oy7L8WKf74l",
    "name": "Buku A",
    "year": 2010,
    "author": "John Doe",
    "summary": "Lorem ipsum dolor sit amet",
    "publisher": "Dicoding Indonesia",
    "pageCount": 100,
    "readPage": 25,
    "finished": false,
    "reading": false,
    "insertedAt": "2021-03-04T09:11:44.598Z",
    "updatedAt": "2021-03-04T09:11:44.598Z"
}

## API Endpoints

### 1. Menambahkan Buku Baru

```raml
/books
  post:
    description: Menambahkan buku baru
    request:
      body:
        application/json:
          example: |
            {
              "name": "Buku A",
              "year": 2010,
              "author": "John Doe",
              "summary": "Lorem ipsum dolor sit amet",
              "publisher": "Dicoding Indonesia",
              "pageCount": 100,
              "readPage": 25,
              "reading": false
            }
    responses:
      400:
        description: properti `name` kosong
        body:
          application/json:
            example: |
              {
                "status": "fail",
                "message": "Gagal menambahkan buku. Mohon isi nama buku",
              }
	400:
        description: properti `readPage` lebih besar dari `pageCount`
        body:
          application/json:
            example: |
              {
                "status": "fail",
                "message": "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
              }
	201:
        body:
          application/json:
            example: |
              {
    		"status": "success",
   		"message": "Buku berhasil ditambahkan",
    		"data": {
        	"bookId": "1L7ZtDUFeGs7VlEt"
    		}
		}
```

### 2. Menampilkan seluruh buku

```raml
/books
  get:
    description: Menampilkan semua buku
    responses:
      200:
        body:
          application/json:
            example: |
            {
    "status": "success",
    "data": {
        "books": [
            {
                "id": "Qbax5Oy7L8WKf74l",
                "name": "Buku A",
                "publisher": "Dicoding Indonesia"
            },
            {
                "id": "1L7ZtDUFeGs7VlEt",
                "name": "Buku B",
                "publisher": "Dicoding Indonesia"
            },
            {
                "id": "K8DZbfI-t3LrY7lD",
                "name": "Buku C",
                "publisher": "Dicoding Indonesia"
            }
        ]
    }
}
```

### 3. Menampilkan detail buku

```raml
/books/{bookId}
  get:
    description: Menampilkan detail buku
    responses:
      404:
        description: buku tidak ditemukan
        body:
          application/json:
            example: |
              {
                "status": "fail",
                "message": "Buku tidak ditemukan",
              }
	200:
         description: buku ditemukan
	 body:
          application/json:
            example: |
		{
    		"status": "success",
    		"data": {
        	"book": {
          	 	"id": "aWZBUW3JN_VBE-9I",
            		"name": "Buku A Revisi",
            		"year": 2011,
            		"author": "Jane Doe",
            		"summary": "Lorem Dolor sit Amet",
            		"publisher": "Dicoding",
            		"pageCount": 200,
            		"readPage": 26,
            		"finished": false,
            		"reading": false,
            		"insertedAt": "2021-03-05T06:14:28.930Z",
            		"updatedAt": "2021-03-05T06:14:30.718Z"
        		}
    			}
			}
```

### 4. Mengubah data buku

```raml
/books/{bookId}
  put:
    description: Mengubah data buku
    request:
      body:
        application/json:
          example: |
            {
   		"name": string,
    		"year": number,
    		"author": string,
    		"summary": string,
    		"publisher": string,
    		"pageCount": number,
    		"readPage": number,
    		"reading": boolean
		}
    responses:
      400:
        description: properti `name` kosong
        body:
          application/json:
            example: |
              {
                "status": "fail",
                "message": "Gagal memperbarui buku. Mohon isi nama buku",
              }
      400:
        description: properti `readPage` lebih besar dari `pageCount`
        body:
          application/json:
            example: |
              {
                "status": "fail",
                "message": "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
              }
      404:
        description: `id` buku tidak ditemukan
        body:
          application/json:
            example: |
              {
                "status": "fail",
                "message": "Gagal memperbarui buku. Id tidak ditemukan",
              }
	200:
        body:
          application/json:
            example: |
              {
                "status": "success",
                "message": "Buku berhasil diperbarui",
              }
```

### 5. Menghapus buku

```raml
/books/{bookId}
  delete:
    description: Menghapus buku
    responses:
      404:
        body:
          application/json:
            example: |
              {
    		"status": "fail",
    		"message": "Buku gagal dihapus. Id tidak ditemukan"
		}
      200:
        description: `id` buku tidak ditemukan
        body:
          application/json:
            example: |
              {
                "status": "success",
                "message": "Buku berhasil dihapus"
              }
```
