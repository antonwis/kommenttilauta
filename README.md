# Kommenttilauta
Path of Exile -themed message board where users can create and comment on posts.
Users can also search the official Path of Exile database for leagues, accounts and characters.

Authors: Petri Forsman & Anton Wiskari

## Project setup

Be sure to run the setup script both in root and in client folder to install all dependencies
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

# REST API Docs

## Overview
Kommenttilauta currently has a basic API that will return results in JSON format.
#
## Authentication
Resource path:
```
api/auth
```
#
```
GET api/auth
```
Returns an user object if provided with a valid token.

Access: Public
#

```
POST api/auth
```
Authenticates an user and retrieves a token.

Access: Public

#
## User database
Resource path:
```
api/users
```
#
```
POST api/users
```
Registers a new user.

Access: Public

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
#
```
GET api/forum/list
```
Gets all forum posts.

Access: Public
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
#
```
POST api/forum/create
```
Create new forum post object and saves it to the database.

Access: Private

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