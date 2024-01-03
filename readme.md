# URL Shortener API

This repository contains a **URL Shortener** . This URL Shortner can create short URLs, fetch analytics data, redirect to long URLs, signing up a user, and logging in a user.

## Swagger
Please check `swagger.yaml` for Swagger documentation.

## Postman Collection
Please check `URL-Shortener.postman_collection.json` for Postman collection.


## User flow

### Replace `{{server}}` in the endpoints with the actual server URL.

### 1. Signup for a User

- **Name**: Signup for a user
- **Method**: POST
- **Endpoint**: `{{server}}/user/signup`
- **Body**: Raw JSON
  ```json
  {
      "name": "Shubham Goyal",
      "email": "shubham1@gmail.com",
      "password": "123123"
  }
  ```
- **Response**: Raw JSON
    ```json
    {
        "message": "Email already exist"
    }
    ```
    or
    ```json
    {
        "message": "Successfully Signed Up, Login to continue"
    }
    ```

### 2. Login for a User

- **Name**: Login for a user
- **Method**: POST
- **Endpoint**: `{{server}}/user/login`
- **Body**: Raw JSON
  ```json
  {
      "email": "shubham1@gmail.com",
      "password": "123123"
  }
  ```
- **Response**: Raw JSON
    ```json
    {
        "message": "Logged in successfully."
    }
    ```
    or
    ```json
    {
        "message": "Invalid Username or Password"
    }
    ```

### 3. Create a Short URL

- **Name**: Create a short URL
- **Method**: POST
- **Endpoint**: `{{server}}/url`
- **Body**: Raw JSON
  ```json
  {
      "url": "https://www.google.in"
  }
  ```
- **Response**: Raw JSON
  ```json
    {
    "id": "qeUA_g5ED"
    }
  ```


### 4. Redirect to Long URL

- **Name**: Redirect to long URL
- **Method**: GET
- **Endpoint**: `{{server}}/MT0dKv0Hv`


### 5. Fetch Analytics Data

- **Name**: Fetch analytics data
- **Method**: GET
- **Endpoint**: `{{server}}/url/analytics/MT0dKv0Hv`
- **Response**: Raw JSON
    ```json
    {
        "totalClicks": 1,
        "analytics": [
            {
                "timestamp": 1704274722047,
                "_id": "65952b22f94615204914a20e"
            }
        ]
    }
    ```


## Documentation

- [Node.js](https://nodejs.org/en/docs/) 
- [Express.js](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/docs/guide.html)