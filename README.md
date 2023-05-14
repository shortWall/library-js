
# library

# description
it is a library app with mongoDB. you can register books and then registered user can borrow books.

# installation

$ mongod 
$ node index


## usage

**_Post_-> localhost:3000/books**  for add new book to books database with this format.
```
{
    "name"   : string , //neccessery
    "author" : string , //neccessery
    "edit"   : number , //optional
    "pages"  : number   //optional
 }
 ```
 
**_Get_ -> localhost:3000/books** for get all books.

**_Get_ -> localhost:3000/books/:id** book with specific id  for get book with specific id.

**_Put_ -> localhost:3000/books/:id**  book with specific id  change information of book with specific id
```
{
    "name"   : string, 
    "author" : string, 
    "edit"   : number, 
    "pages"  : number 
}
```
 
 **_Delete_ ->  localhost:3000/books/:id** delete book with specific id.
 
**_Post_-> localhost:3000/users/register** register user.
```
{
    "books"      : array(ObjectId(bookid)), //optional
    "first_name" : string,
    "last_name"  : string,
    "username"   : string, // must be unique
    "email"      : string, //optional
    "password"   : string
}
```

**_Post_ -> localhost:3000/users/login**  for login return token (x.data.token).
```
{
  "username" : string,
  "password" : string
  }
  ```

**_Post_ -> localhost:3000/users/addbook**  add just one book to user and also in usres array in book db(show last 3 person have book).
must give token in req.header("token").
```
{
"id" : ObjectId(bookid)
}
```

**_Post_ -> localhost:3000/users/removebook**  remove just one book to user .
must give token in req.header("token").
```
{
"id" : ObjectId(bookid)
}
```

**_Get_ -> localhost:3000/users/showuser/:id** show user with specific id.


if input be correct return a json with massage and data fields.
if input be incorrect return a json/text with massage and emptty data fields. 





