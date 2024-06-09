# Anime Enthusiast Hub

## Overview

Anime Enthusiast Hub is a comprehensive platform designed for anime enthusiasts to connect, explore, and share their love for anime. It combines the functionalities of an Anime Community Platform and an Anime and Manga Database, offering users a rich space to discuss, discover, and manage their anime experiences.

### Problem

Anime enthusiasts face challenges in finding a centralized platform to connect with like-minded individuals, share their favorite anime, and discover new gems. Current platforms lack a seamless integration of community features and a comprehensive anime database, making it difficult for users to engage with both aspects in one place.

### User Profile

- Anime enthusiasts:
  - Seeking a vibrant community to discuss and share anime experiences
  - Looking for a platform to discover new anime based on user recommendations
  - Wanting to maintain a personalized list of watched anime and track their preferences

### Features

- As a user, I want to create a profile with an avatar, bio, and anime preferences.
- As a user, I want to participate in discussion forums categorized by genres, series, and user-generated topics.
- As a user, I want to vote on discussions and comments to promote top-rated content.
- As a user, I want to search and filter a comprehensive database of anime and manga.

## Implementation

### Tech Stack

- **Frontend**: React, JavaScript
- **Backend**: Node.js with Express
- **Database**: PostgreSQL
- **API Integration**: MyAnimeList API, AniList API, Kitsu API for fetching anime data
- **Cybersecurity**: SSL/TLS, bcrypt for password hashing, Content Security Policies (CSP)

### APIs

- MyAnimeList API for fetching anime data
- AniList API for additional anime data and recommendations
- Kitsu API for another source of anime data

### Sitemap

- Home page
- User Profile
- Forums
- Anime and Manga Database
- Search and Discovery

### Mockups

#### Home Page

[Home Page Mockup](home.png)

#### User Profile Page

[User Profile Page Mockup](user-profile.png)

#### Forums Page

[Forums Page Mockup](forums.png)

#### Anime and Manga Database

[Anime and Manga Database Mockup](anime-database.png)

#### Search and Discovery

[Search and Discovery Mockup](search-discovery.png)

### Data

#### SQL Diagram

[SQL Diagram](sql-diagram.png)

#### Endpoints

**User Authentication and Profile**

**POST /register**

- Description: Register a new user
- Parameters:
  - username: User's username
  - email: User's email
  - password: User's password
- Response:

```json
{
  "message": "User registered successfully"
}
```

**POST /login**

- Description: Log in a user
- Parameters:
  - email: User's email
  - password: User's password
- Response:

```json
{
  "token": "JWT_TOKEN"
}
```

**GET /profile**

- Description: Fetch the logged-in user's profile
- Parameters:
  - token: JWT token for authentication
- Response:

```json
{
  "id": 1,
  "username": "user123",
  "email": "user123@example.com",
  "avatar_url": "http://example.com/avatar.jpg",
  "bio": "Anime lover",
  "anime_list": [
    {
      "anime_id": 1,
      "title": "Naruto",
      "status": "completed",
      "score": 9
    },
    ...
  ]
}
```

**Anime and Manga Database**

**GET /anime**

- Description: Fetch a list of anime
- Parameters:
  - search: Optional search query
  - filter: Optional filter criteria
- Response:

```json
[
  {
    "id": 1,
    "title": "Naruto",
    "genre": "Action",
    "release_year": 2002
  },
  ...
]
```

**GET /anime/:id**

- Description: Fetch details of a specific anime
- Parameters:
  - id: Anime ID
- Response:

```json
{
  "id": 1,
  "title": "Naruto",
  "genre": "Action",
  "release_year": 2002,
  "description": "A young ninja who seeks recognition from his peers and dreams of becoming the Hokage."
}
```

**User Anime List**

**POST /user/anime**

- Description: Add anime to the user's list
- Parameters:
  - token: JWT token for authentication
  - anime_id: Anime ID
  - status: Watching status (e.g., watching, completed, plan to watch)
  - score: Optional score out of 10
- Response:

```json
{
  "message": "Anime added to list"
}
```

**PUT /user/anime/:id**

- Description: Update the user's anime list entry
- Parameters:
  - token: JWT token for authentication
  - id: Anime list entry ID
  - status: New status
  - score: New score
- Response:

```json
{
  "message": "Anime list entry updated"
}
```

**Forums**

**GET /forums**

- Description: Fetch a list of forum topics
- Response:

```json
[
  {
    "id": 1,
    "title": "Best Anime of 2023",
    "author": "User123",
    "posts": 24
  },
  ...
]
```

**GET /forums/:id**

- Description: Fetch details of a specific forum topic
- Parameters:
  - id: Forum topic ID
- Response:

```json
{
  "id": 1,
  "title": "Best Anime of 2023",
  "author": "User123",
  "posts": [
    {
      "author": "User456",
      "content": "I think Attack on Titan was the best!",
      "votes": 10
    },
    ...
  ]
}
```

**POST /forums**

- Description: Create a new forum topic
- Parameters:
  - token: JWT token for authentication
  - title: Forum topic title
  - description: Forum topic description
- Response:

```json
{
  "message": "Forum topic created"
}
```

**POST /forums/:id/posts**

- Description: Add a post to a forum topic
- Parameters:
  - token: JWT token for authentication
  - id: Forum topic ID
  - content: Post content
- Response:

```json
{
  "message": "Post added to forum topic"
}
```

**Voting System**

**POST /forums/:forum_id/posts/:post_id/vote**

- Description: Vote on a forum post
- Parameters:
  - token: JWT token for authentication
  - forum_id: Forum topic ID
  - post_id: Post ID
  - vote: Vote value (e.g., +1 for upvote, -1 for downvote)
- Response:

```json
{
  "message": "Vote recorded"
}
```

### Auth

- JWT authentication
  - Implemented after core features
  - Store JWT in local storage, remove on logout
  - Different UI for logged-in users

## Roadmap

1. **Create frontend and backend projects**

   - React and Node.js setup with initial routing and pages

2. **Implement user authentication and basic user profile features**

   - User registration, login, and profile creation

3. **Develop forums and voting system**

   - Forums with topics, posts, and voting functionality

4. **Integrate MyAnimeList, AniList, and Kitsu APIs for anime data**

   - Fetch and display anime data

5. **Implement anime and manga database features**

   - Database for anime and manga details

6. **Enhance search and discovery functionalities**

   - Search and filter options for anime and manga

7. **Integrate cybersecurity measures**
   - SSL/TLS, bcrypt, CSP headers, user privacy controls, regular

security audits

8. **Conduct thorough testing**

   - Comprehensive testing for all features

9. **Deploy and launch the Anime Enthusiast Hub**

   - Deployment on a cloud platform

10. **Gather user feedback for future enhancements**

## Nice-to-haves

- Real-time chat for instant communication
- Chat bot that answers Anime related questions.
- Integration with social media platforms for broader reach
- User-contributed content moderation system
- As a user, I want to receive personalized anime recommendations based on my preferences and viewing history.
