# Kommenttilauta
Path of Exile -themed message board where users can create and comment on posts.
Users can also search the official Path of Exile database for leagues, accounts and characters.

Authors: Petri Forsman & Anton Wiskari

## Project overview

Kommenttilauta is a fullstack single page application.

Entry point files for the project:

    Server side: server.js in root

    Client side: client/src/App.vue

The stack used for this project is as follows:

Backend:
```
Database: Mongodb -- mongoose for node

Back-end: Node Express.js

Dependencies:

    bcryptjs
    body-parser 
    concurrently -- for running both ends with one script
    config
    cors
    dotenv
    express 
    express-validator
    jsonwebtoken
    jwt-decode
    moment -- date & time logging / formatting
    mongoose 
    morgan -- dev tool for logging api calls
    node-fetch
    vue-axios
    vuex

devDependencies:

    nodemon -- for automatic server refreshing after changes
```

Front:
```
Vue.js

Bulma CSS framework for styling

Dependencies:

    axios
    core-js
    moment
    vue
    vue-router
    vuex
  
devDependencies:

    @vue/cli-plugin-babel
    @vue/cli-plugin-eslint
    @vue/cli-service
    babel-eslint
    eslint
    eslint-plugin-vue
    vue-template-compiler
```

## Project setup

The node_modules/ folder is excluded from version control. Be sure to run the setup script both in root and in client folder to install all dependencies
```
npm install

cd client

npm install

cd ..
```

### Run both backend and frontend simultaneously in dev mode
```
npm run dev
```
or separately
```
npm run server
npm run client
```
# REST API Docs

## Overview
Kommenttilauta currently has a basic API that will return results in JSON format.

The api can be broken down into two sections: 

1) Everything related to the message board side of the project and

2) The Path of Exile api.

The message board side utilizes 3 different route paths: ```api/auth```, ``` api/user ``` and ``` api/forum```

The Path of Exile api path ```api/poe``` is used to parse data and hit the official Path of Exile public api by Grinding Gear Games. 

Requests are built around models (mongoose schemas): Post, User and Profile.

All models are handled as JSON in the database. Several api calls require JSON payloads that match the models. Currently the Profile model and its related server side functionality is not used. The front end for user profile pages has not been implemented.
#
## Authentication
Resource path:
```
api/auth
```
Response codes:
```
200 - OK
400 - Invalid credentials
401 - No token, authorization denied
500 - Server error
```
#
```
GET api/auth
```
Returns an user object if provided with a valid token.

Access: Public



Example:
```
GET http://localhost:5000/api/auth

Response with a valid token in header (authToken: "token"):

Status: 200 OK
{
    "_id": "5debb7ad9572c636ec65101d",
    "name": "Petri Forsman",
    "email": "petrifo@metropolia.fi",
    "date": "2019-12-07T14:31:09.567Z",
    "__v": 0
}

Without a token:

Status: 401 Unauthorized
{
    "msg": "No token, authorization denied"
}
```
#

```
POST api/auth
```
Authenticates an user and retrieves a token.

Access: Public


Example:
```
POST http://localhost:5000/api/auth

With example payload:

    {
    "email": "kappa@kys.org",
    "password": "kyskys"
    }

Response:

Status: 200 OK
    {
        "user": {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWRmMGFjZTFiNTgzMmEyM2NjNTlmZGQ5In0sImlhdCI6MTU3NjE3NTg2MywiZXhwIjoxNTc2NTM1ODYzfQ.GCoiNdXv-S_qlW4uyxZ1Tzf66bPmCqUhx0gH4-PFsc8",
            "id": "5df0ace1b5832a23cc59fdd9",
            "name": "Kappa",
            "email": "kappa@kys.org"
        }
    }

Response without user object payload:

Status: 400 Bad Request
{
    "errors": [
        {
            "msg": "Please include a valid email",
            "param": "email",
            "location": "body"
        },
        {
            "msg": "Password is required",
            "param": "password",
            "location": "body"
        }
    ]
}
```
#
## User database
Resource path:
```
api/users
```

Response codes:
```
200 - OK
400 - Bad Request
500 - Server error
```
#
```
POST api/users
```
Registers a new user.

Access: Public


Example:
```
POST http://localhost:5000/api/users

With example payload:

    {
	"name": "testi",
	"email": "testi@tes.ti",
	"password": "testi1"
    }

Response:

Status: 200 OK
    {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWRmMjhiZTdlZjhhOTEzYmQ4NDM1ZDVhIn0sImlhdCI6MTU3NjE3NjYxNSwiZXhwIjoxNTc2NTM2NjE1fQ.7AL5uFDo-U04R6IgGpeBcc-XVrfhFGZ_NojStMvvHiY"
    }

Response without user object payload:

Status: 400 Bad Request
    {
        "errors": [
            {
                "msg": "Name is required",
                "param": "name",
                "location": "body"
            },
            {
                "msg": "Please include a valid email",
                "param": "email",
                "location": "body"
            },
            {
                "msg": "Please enter a password with 6 or more characters",
                "param": "password",
                "location": "body"
            }
        ]
    }
```
#
## User profiles
Profile page is not currently implemented in the web application. These api routes work but are unused.

Resource path:
```
api/profile
```
#

```
GET api/profile/me
```
Gets the current user's profile.

Access: Private
#

```
POST api/profile
```
Create or update user profile.

Access: Private
#

```
GET api/profile
```
Get all profiles.

Access: Public
#

```
GET api/profile/user/:user_id
```
Get profile by user ID

Access: Public

Parameters:
```
user_id: Unique user id
```
#
## Forum database

Resource path:
```
api/forum
```

Response codes:
```
200 - OK
304 - No changes
404 - Not found
400 - Bad Request
401 - Unauthorized
500 - Server error
```
#
```
GET api/forum/list
```
Gets all forum posts.

Access: Public

Example:
```
GET http://localhost:5000/api/forum/list

Response:

Status: 200 OK
{
    "posts": [
        {
            "_id": "5df20e0e3f18a410fcf16763",
            "title": "testititle",
            "body": "testi",
            "name": "Petri Forsman",
            "user": "5debb7ad9572c636ec65101d",
            "likes": [
                {
                    "_id": "5df21d09e19cab4bb8078fc8",
                    "user": "5df0ace1b5832a23cc59fdd9"
                },
                {
                    "_id": "5df20e3a3f18a410fcf16765",
                    "user": "5debb7ad9572c636ec65101d"
                }
            ],
            "comments": [
                {
                    "date": "2019-12-12T12:35:06.543Z",
                    "_id": "5df233fa8f97771e7853c4da",
                    "text": "hei",
                    "name": "pekka"
                },
                {
                    "date": "2019-12-12T10:48:20.065Z",
                    "_id": "5df21af4e19cab4bb8078fc2",
                    "text": "moro",
                    "name": "seppo"
                },
                {
                    "date": "2019-12-12T09:53:33.778Z",
                    "_id": "5df20e1d3f18a410fcf16764",
                    "text": ":DD",
                    "name": "simo"
                }
            ],
            "date": "2019-12-12T09:53:18.085Z",
            "createdAt": "2019-12-12T09:53:18.085Z",
            "updatedAt": "2019-12-12T12:35:06.547Z",
            "__v": 5
        },
        {
            "_id": "5df21b10e19cab4bb8078fc3",
            "title": "testi 222",
            "body": "jotain sisältöä",
            "name": "Kappa",
            "user": "5df0ace1b5832a23cc59fdd9",
            "likes": [
                {
                    "_id": "5df28c9f706e57056cc3e6d2",
                    "user": "5debb7ad9572c636ec65101d"
                },
                {
                    "_id": "5df244188f97771e7853c4db",
                    "user": "5df0ace1b5832a23cc59fdd9"
                }
            ],
            "comments": [
                {
                    "date": "2019-12-12T10:50:25.037Z",
                    "_id": "5df21b71e19cab4bb8078fc6",
                    "text": "asdsad",
                    "name": "asd"
                }
            ],
            "date": "2019-12-12T10:48:48.835Z",
            "createdAt": "2019-12-12T10:48:48.836Z",
            "updatedAt": "2019-12-12T18:53:19.009Z",
            "__v": 9
        },
        {
            "_id": "5df288f5706e57056cc3e6ce",
            "title": "asdasd",
            "body": "asdasd",
            "name": "Petri Forsman",
            "user": "5debb7ad9572c636ec65101d",
            "likes": [],
            "comments": [],
            "date": "2019-12-12T18:37:41.734Z",
            "createdAt": "2019-12-12T18:37:41.734Z",
            "updatedAt": "2019-12-12T18:54:48.114Z",
            "__v": 4
        }
    ]
}
```
#

```
GET api/forum/:id
```
Get forum post by id

Access: Public

Parameters:
```
id: id of the post object
```

Example:
```
GET http://localhost:5000/api/forum/5df20e0e3f18a410fcf16763

Response:

Status: 200 OK
{
    "post": {
        "_id": "5df20e0e3f18a410fcf16763",
        "title": "testititle",
        "body": "testi",
        "name": "Petri Forsman",
        "user": "5debb7ad9572c636ec65101d",
        "likes": [
            {
                "_id": "5df21d09e19cab4bb8078fc8",
                "user": "5df0ace1b5832a23cc59fdd9"
            },
            {
                "_id": "5df20e3a3f18a410fcf16765",
                "user": "5debb7ad9572c636ec65101d"
            }
        ],
        "comments": [
            {
                "date": "2019-12-12T12:35:06.543Z",
                "_id": "5df233fa8f97771e7853c4da",
                "text": "hei",
                "name": "pekka"
            },
            {
                "date": "2019-12-12T10:48:20.065Z",
                "_id": "5df21af4e19cab4bb8078fc2",
                "text": "moro",
                "name": "seppo"
            },
            {
                "date": "2019-12-12T09:53:33.778Z",
                "_id": "5df20e1d3f18a410fcf16764",
                "text": ":DD",
                "name": "simo"
            }
        ],
        "date": "2019-12-12T09:53:18.085Z",
        "createdAt": "2019-12-12T09:53:18.085Z",
        "updatedAt": "2019-12-12T12:35:06.547Z",
        "__v": 5
    }
}
```
#
```
POST api/forum/create
```
Create new forum post object and saves it to the database.

Access: Private

Example:
```
POST http://localhost:5000/api/forum/create

Response with a valid token and valid payload:

Payload:
    {
    "title":"dsa",
    "body":"dsa"
    }

Status: 200 OK
    {
        "post": {
            "_id": "5df29171ef8a913bd8435d5b",
            "title": "dsa",
            "body": "dsa",
            "name": "Petri Forsman",
            "user": "5debb7ad9572c636ec65101d",
            "likes": [],
            "comments": [],
            "date": "2019-12-12T19:13:53.432Z",
            "createdAt": "2019-12-12T19:13:53.433Z",
            "updatedAt": "2019-12-12T19:13:53.433Z",
            "__v": 0
        }
    }

Response with no auth token:

    Status: 401 Unauthorized
    {
        "msg": "No token, authorization denied"
    }

Response with a token but no payload:

    Status: 400 Bad Request
    {
        "errors": [
            {
                "msg": "Text is required",
                "param": "body",
                "location": "body"
            }
        ]
    }

```
#
```
POST api/forum/update/_:id
```
Updates an existing post object.

Access: Private

Parameters:
```
_id: id of the post object
```

Example:
```
POST http://localhost:5000/api/forum/update/5df28920706e57056cc3e6cf

Response: 

Status: 200 OK
{
    "message": "Post updated!",
    "post": {
        "_id": "5df28920706e57056cc3e6cf",
        "title": "asddsadsa",
        "body": "dsadsa",
        "name": "Petri Forsman",
        "user": "5debb7ad9572c636ec65101d",
        "likes": [],
        "comments": [],
        "date": "2019-12-12T18:38:24.507Z",
        "createdAt": "2019-12-12T18:38:24.508Z",
        "updatedAt": "2019-12-12T18:45:28.526Z",
        "__v": 0
    }
}
```
#
```
DELETE api/forum/_:id
```
Deletes an existing post object.

Access: Private

Parameters:
```
_id: id of the post object
```

Example:
```
DELETE http://localhost:5000/api/forum/5df28920706e57056cc3e6cf

Response:
    {
        "msg": "Post deleted"
    }

```
#
```
PUT api/forum/like/:id
```
Applies a like into an existing post object if the post has not already been liked by the same user.

Access: Public

Parameters:
```
id: id of the post object
```

Example:
```
PUT http://localhost:5000/api/forum/like/5df28920706e57056cc3e6cf

Response:
    {
        "likes": [
            {
                "_id": "5df28caf706e57056cc3e6d3",
                "user": "5debb7ad9572c636ec65101d"
            }
        ]
    }

Response if already liked:
    {
    "msg": "Post already liked"
    }
```
#
```
PUT api/forum/unlike/:id
```
Removes a like from an existing post object if the post has been previously liked by the same user.

Access: Public

Parameters:
```
id: id of the post object
```

Example:
```
PUT http://localhost:5000/api/forum/unlike/5df28920706e57056cc3e6cf

Successful response returns a like array. Can be empty:
    []

Response if not already liked:
    {
        "msg": "Post has not yet been liked"
    }

```
#
```
POST api/forum/comment/:id
```
Adds a new comment to an exisiting post object.

Access: Public

Parameters:
```
id: id of the post object
```

Example:
```
POST http://localhost:5000/api/forum/comment/5df20e0e3f18a410fcf16763

Payload:
    {
        "name":"kommentoija",
        "text":"kommentti"
    }

Response:

Status: 200 OK
{
    "comments": [
        {
            "_id": "5df295d3ef8a913bd8435d5d",
            "text": "kommentti",
            "name": "kommentoija",
            "date": "2019-12-12T19:32:35.945Z"
        }
    ]
}

```
#
```
DELETE api/forum/comment/:id/:comment_id
```
Removes a comment from a post object if the user is also the author of the post object.

Access: Private

Parameters:
```
id: id of the post object
comment_id: id of the comment object
```

Example:
```
DELETE http://localhost:5000/api/forum/comment/5df20e0e3f18a410fcf16763/5df295d3ef8a913bd8435d5d

Returns the remaining comments array. Can be empty

```
#
## Path of Exile api

Resource path:
```
api/poe
```
#
```
GET api/poe/leagues/list
```
Gets all ongoing Path of Exile leagues.

Access: Public
#

```
GET api/poe/leagues/:league
```
Gets a league by league name

Access: Public

Parameters:
```
league: name of the league
```
#

```
GET api/poe/ladder/:league
```
Gets the ladder of a league name

Access: Public

Parameters:
```
league: name of the league
```
#

```
GET api/poe/account/:accountName
```
Gets the character list of an account

Access: Public

Parameters:
```
accountName: name of the account
```
#

```
GET api/poe/account/:accountName/:charName/passives
```
Gets the passive skill tree & jewel info of a character

Access: Public

Parameters:
```
accountName: name of the account
charName: name of the character
```
#

```
GET api/poe/account/:accountName/:charName/items
```

Gets the equipped item data of a character

Access: Public

Parameters:
```
accountName: name of the account
charName: name of the character
```
#