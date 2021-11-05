basic steps to run project:\
npm i\
npm start

endpoints:\
GET /users
get all users

POST /users\
adds user. !important\
only admins can add or remove users
header authorization: "admin" needed\
body example:
`{
    "name": "Name",
    "age": 100
}`

DELETE /users/:id\
removes users by id