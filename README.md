# EPAM Node mentoring program 2021

**Stack:**
* NodeJS
* Express
* TypeScript
* Joi
* Nodemon
* Babel
* ESLint
* PostgreSQL
* Sequelize

To start project clone the repo, type in the terminal **npm install** and then run command **npm start**.

## Hometask 2:  In memory CRUD REST service with validation

Endpoints created during this task:
* _/users_ (with **GET** method returns array of dummy users)
* _/users/:id_  (with **GET** method returns array of dummy user with param-id)
* _/users_  (with **POST** method creates new user in the array of dummy users)
* _/users/:id_ (with **PUT** method updates user in the array of dummy users)
* _/suggest/users?limit={number}&loginSubstring={string}  (with **GET** method returns array of logins matched with input value)

## Hometask 3: PostgreSQL and layered architecture
Added _db_ directory with PostgreSQL connection via Sequelize.
Added _data-access_ directory with methods to manipulates directly to db.

## Hometask 4: Second entity and many-to-many relationships