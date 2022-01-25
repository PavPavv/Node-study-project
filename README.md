# EPAM Node mentoring program 2021

**Stack:**
* NodeJS
* Express
* TypeScript
* Nodemon
* Babel
* ESLint
* PostgreSQL
* Sequelize
* Winston
* Joi
* JsonWebToken
* Cors

To start project, please, clone the repo, type in the terminal **npm install** and then run command **npm start**.

## Project structure:
In the root directory there are main config files of the project:
* **tsconfig.json** - config for TS compilier
* **README.md** - project's documentation
* **.package.json** - all the project's dependencies and commands
* **.gitignore** - git exceptions
* **.eslint** - code style config
* _client_ - directory for client-side code (view part for browsers)
* _server_ - directory for server-side code (endpoints, db connection and etc.)
* *node_modules* - nodeJS library

_server_ directory contains following:
* **app.ts** - server root file where server starts
* **/controllers** - endpoints functionality
* **/data-access** - db intermediate
* **/db** - db connection
* **/middlewares** - app middle-wares which is using in the app.ts
* **/models** - db models
* **/routes** - all the project's endpoints here
* **/types** - server instances types

_client_ directory contains following:
* **src** - client code

## Homework 2:  In memory CRUD REST service with validationo

Endpoints created during this task:
* _/users_ (with **GET** method returns array of dummy users)
* _/users/:id_  (with **GET** method returns array of dummy user with param-id)
* _/users_  (with **POST** method creates new user in the array of dummy users)
* _/users/:id_ (with **PUT** method updates user in the array of dummy users)
* _/suggest/users?limit={number}&loginSubstring={string}  (with **GET** method returns array of logins matched with input value)

## Homework 3: PostgreSQL and layered architecture
Added _db_ directory with PostgreSQL connection via Sequelize.
Added _data-access_ directory with methods to manipulates directly to db.
Added 3-layer architecture (data-access/services/controllers).

## Hometask 4: Second entity and many-to-many relationships
Added new model **UserGroup** for _through_-table "user_groups".

## Homework 5: Logging and error handling
Added Winston package for logging server errors.
Added to every controller error log name, arguments which have been passed to the controller function, error message.

## Homework 6: JWT authorization and CORS
Added new packages _cors_ and _jsonwebtoken_ and middle-ware for authentication. Implemented authentication with JWT. Added new _login_ endpoint
and auth middleware.

## Homework 7: Unit tests
Added unit tests for users controller.