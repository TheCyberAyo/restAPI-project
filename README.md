# restAPI-project

JSON Item API
This is a simple HTTP server built with Node.js that allows for CRUD (Create, Read, Update, Delete) operations on a JSON file. The server manages a list of items stored in a file named anything.json.

Features
GET /items: Retrieve the list of items.
POST /items: Add a new item to the list.
PUT /items/
: Update an existing item by its ID.
DELETE /items/
: Remove an item by its ID.

Requirements
Node.js (v12 or higher)

Installation
1. Clone this repository to your local machine
2. Install the necessary dependencies, npm in this intance
3. 

API Endpoints
1. Get items
Status 200: Returns an array of items.
2. Add a New Item

3. Update an Existing Item
Request:
http
PUT /items/:id
Content-Type: application/json

Response:

Status 200: Returns the updated item.
Status 404: Returns an error message if the item is not found.
Status 400: Returns an error message for invalid JSON.

4. Delete an Item
Request: http
DELETE /items/:id

Response:
Status 204: Item successfully deleted.
Status 404: Returns an error message if the item is not found.

ERROR HANDLING
The API returns appropriate HTTP status codes and error messages for different types of errors, including:

400: Bad Request (e.g., Invalid JSON)
404: Not Found (e.g., Item not found)
500: Internal Server Error (e.g., Issues with reading or writing to the file)
