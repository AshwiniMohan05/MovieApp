# MovieApp

This app displays a list of movies based on the filters provided and the search criteria.  It helps the user to search for movies by title, filter them by genre, rating, and language, and browse popular movies.

## Table of Contents

  - [MovieApp](#movieapp)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Installation](#installation)
  - [Usage](#usage)
  - [API Key Setup](#api-key-setup)
  - [Using the API in MovieApp](#usage-api)
  - [Unit Test](#unit-test)


## Features

- **Search**: To find the movies using keyword.
- **Filters**: To look for movies based on gnere, language and rating
- **Responsive Design**: Responsive feature on different viewports.
- **Hamburger Menu**: On mobile, hamburger menu shows different routes avilable within the application.(React Router is utilized to define various routes).

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: To specifying the types of data being passed around within the code.
- **Styled-Components**: Utilized for writing CSS in JavaScript with a focus on component-based styling.
- **Fetch API**: Used for making HTTP requests to fetch movie data.
- **TMDb API**: The Movie Database (TMDb) API is used to fetch movie data.

## Installation

To get a local copy of the project up and running, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/AshwiniMohan05/movieapp.git
    ```

2. **Navigate to the project directory**:
    ```bash
    cd MovieApp
    ```

3. **Install the dependencies**:
    ```bash
    npm i --legacy-peer-deps
    ```
## Usage

To start the development server, run the following command:
```bash
npm start
```
This will start the application, and you can view it in your browser at http://localhost:3000.
## API Key Setup

MovieApp interacts with The Movie Database (TMDb) API to fetch movie data. Below is a description of the key API endpoints and their structures:

All API requests are made to the TMDb API base URL:
```bash
    https://api.themoviedb.org/3/
```
### Endpoints

1. **Get Popular Movies**

   - **Endpoint**: `/movie/popular`
   - **Method**: `GET`
   - **Parameters**:
     - `api_key` (required): Your API key from TMDb.
   - **Example Request**:
     ```
     GET https://api.themoviedb.org/3/movie/popular?api_key=YOUR_API_KEY&page=1
     ```
   - **Response**:
     ```json
     {
       "page": 1,
       "results": [
         {
           "id": 12345,
           "title": "Movie Title",
           "overview": "Movie description",
           "genre_ids": [1, 2, 3],
           "release_date": "2023-01-01",
           "poster_path": "/path/to/poster.jpg"
         }
         // More movies...
       ],
       "total_results": 10000,
       "total_pages": 500
     }
     ```

2. **Search Movies**

   - **Endpoint**: `/search/movie`
   - **Method**: `GET`
   - **Description**: Searches for movies based on a query string.
   - **Parameters**:
     - `api_key`: Your API key from TMDb.
     - `query`: The search query.
   - **Example Request**:
     ```
     GET https://api.themoviedb.org/3/search/movie?api_key=YOUR_API_KEY&query=Inception&page=1
     ```
   - **Response**:
     ```json
     {
       "page": 1,
       "results": [
         {
           "id": 12345,
           "title": "Inception",
           "overview": "A mind-bending thriller",
           "genre_ids": [28, 878, 12],
           "release_date": "2010-07-16",
           "poster_path": "/path/to/poster.jpg"
         }
         // More movies...
       ],
       "total_results": 100,
       "total_pages": 5
     }
     ```

### Using the API in MovieApp

MovieApp makes HTTP requests to the above TMDb API endpoints to fetch and display movie data. To interact with these endpoints, you need to provide your TMDb API key, which should be stored in a `.env` file in the root directory of your project. I have just added the varibale names. I can send the keys directly to the contact person due to security reasons.

### Unit test

    To run the unit test cases
```bash
npm test
```


