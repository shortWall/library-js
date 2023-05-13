# library
Post-> localhost:3000/books  for add new book to books database with this format
{
    "name"   : string , neccessery
    "author" : string , neccessery
    "edit"   : number , optional
    "pages"  : number   optional
 }
 
Get -> localhost:3000/books for get all books

Get - > book with specific id  for get book with specific id

Put ->  book with specific id  change information of book with specific id
{
    "name"   : string, 
    "author" : string, 
    "edit"   : number, 
    "pages"  : number 
 }
 
 Delete ->  localhost:3000/books/:id delete book with specific id
 
 Post -> localhost:3000/users/register register user
 
 {
    "books"      : [ObjectId(book)], optional
    "first_name" : string,
    "last_name"  : string,
    "username"   : string, // must be unique
    "email"      : string, optional
    "password"   : string
}

Post -> localhost:3000/users/login  for login return token //x.data.token
{
  "username" : string,
  "password" : string
}

Post -> localhost:3000/users/addbook  add just one book to user and also in usres array in book db(show last 3 person have book)
must give token in req.header("token")
{
"id" : ObjectId(bookid)
}

Post -> localhost:3000/users/removebook  remove just one book to user 
must give token in req.header("token")
{
"id" : ObjectId(bookid)
}

Get -> localhost:3000/users/showuser/:id show user with specific id







