basic steps to run project:\
npm i\
npm start

endpoints:\
GET /users
get all users

POST /users\
adds user. !important\
only admins can add or remove users
header authorization: "admin" needed

DELETE /users/:id\
removes users by id