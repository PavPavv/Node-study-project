# EPAM Node mentoring program 2021
## Hometask 2:  In memory CRUD REST service with validation

**Stack:**
* NodeJS
* Express
* TypeScript
* Joi
* Nodemon
* Babel
* ESLint

To start project clone the repo, type in the terminal **npm install** and then run command **npm start**.

Endpoints created during this task:
* _/users_ (with **GET** method returns array of dummy users)
* _/users/:id_  (with **GET** method returns array of dummy user with param-id)
* _/users_  (with **POST** method creates new user in the array of dummy users)
* _/users/:id_ (with **PUT** method updates user in the array of dummy users)
* _/users/suggest_  (with **POST** method returns array of logins matched with input value)