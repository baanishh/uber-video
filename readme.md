# API Documentation

## /users/register

### Description
This endpoint is used to register a new user.

### Method
POST

### Request Body
The request body must be a JSON object containing the following fields:
- `fullname`: An object containing:
  - `firstname` (string, required): The first name of the user. Must be at least 3 characters long.
  - `lastname` (string, required): The last name of the user. Must be at least 3 characters long.
- `email` (string, required): The email address of the user. Must be a valid email format.
- `password` (string, required): The password for the user. Must be at least 6 characters long.

### Response

#### Success (201)
- **Status Code**: 201 Created
- **Response Body**: A JSON object containing:
  - `token`: The authentication token for the user.
  - `user`: The created user object.

#### Error (400)
- **Status Code**: 400 Bad Request
- **Response Body**: A JSON object containing:
  - `errors`: An array of error messages indicating what validation failed.

### Example Request
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Example Response
```json
{
  "token": "some.jwt.token",
  "user": {
    "_id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

## /users/login

### Description
This endpoint is used to log in an existing user.

### Method
POST

### Request Body
The request body must be a JSON object containing the following fields:
- `email` (string, required): The email address of the user. Must be a valid email format.
- `password` (string, required): The password for the user. Must be at least 6 characters long.

### Response

#### Success (200)
- **Status Code**: 200 OK
- **Response Body**: A JSON object containing:
  - `token`: The authentication token for the user.
  - `user`: The logged-in user object.

#### Error (400)
- **Status Code**: 400 Bad Request
- **Response Body**: A JSON object containing:
  - `errors`: An array of error messages indicating what validation failed.

#### Error (401)
- **Status Code**: 401 Unauthorized
- **Response Body**: A JSON object containing:
  - `message`: An error message indicating invalid email or password.

### Example Request
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Example Response
```json
{
  "token": "some.jwt.token",
  "user": {
    "_id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

## /users/profile

### Description
This endpoint retrieves the profile information of the authenticated user.

### Method
GET

### Headers
- `Authorization`: Bearer token (required)

### Response

#### Success (200)
- **Status Code**: 200 OK
- **Response Body**: A JSON object containing the user's profile information.

#### Error (401)
- **Status Code**: 401 Unauthorized
- **Response Body**: A JSON object containing:
  - `message`: An error message indicating invalid or missing token.

### Example Response
```json
{
  "user": {
    "_id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

## /users/logout

### Description
This endpoint logs out the currently authenticated user by invalidating their token.

### Method
POST

### Headers
- `Authorization`: Bearer token (required)

### Response

#### Success (200)
- **Status Code**: 200 OK
- **Response Body**: A JSON object containing:
  - `message`: Confirmation of successful logout.

#### Error (401)
- **Status Code**: 401 Unauthorized
- **Response Body**: A JSON object containing:
  - `message`: An error message indicating invalid or missing token.

### Example Response
```json
{
  "message": "Logged out successfully"
}
```
