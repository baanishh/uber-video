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
