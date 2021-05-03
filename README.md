# Social Network Application

## Project Requirements:
- NodeJS
- PostgreSQL

## Getting Started:
Clone the repo and install dependencies
```bash
npm install
```

Run the API server
```bash
npm run start
npm run dev
```
Server is up at [http://localhost:8000](http://localhost:8000)

## Database Configuration:
Database credentials can be edited at /config/db.js

## Routing:
/posts ROUTES (Authenticated):
- GET /posts/:noOfPosts can be used here to limit the number of posts in your feed.
- GET /posts: Returns all the posts associated with your followings with default limit 10.
- POST /posts: Create a post for the user authenticated.

/followers ROUTES (Authenticated):
- GET /followers/:noOfFollowers can be used here to limit the number of followers to view.
- GET /followers: Returns all of the user's followers with default limit 10.
- POST /followers/:userID: Follow a user.
- DELETE /followers/:userID: Unfollow a user.

/users ROUTES (Unauthenticated):
- POST /users: To add a new user using form-data.

/ ROUTES (Unauthenticated):
- /login for logging into the application.

/ ROUTES (Authenticated):
- /feed to view social media feed of a user.


## Modules Completed:
- Data Models
- User Relationships
- Authentication
- Social Feed
