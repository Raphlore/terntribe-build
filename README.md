# The Causes model uses Mongoose to define a schema with fields for title, description, imageUrl, and an array of contributions. 
## Contributions are stored as subdocuments to keep related data together and simplify queries. 
## Timestamps are included to track creation and updates.

## ENDPOINTS

## POST /causes – Creates a new cause with required validation.

## GET /causes – Retrieves all causes from the database.

## GET /causes/:id – Retrivee a specific cause by its ID.

## PUT /causes/:id – Updates a cause by ID with validation.

## DELETE /causes/:id – Delete a cause by ID.

## POST /causes/contribute/:id – Adds a contribution to a cause. Contributions require name, email, and amount. They are stored directly within the cause document for simplicity.

# Each endpoint includes validation and appropriate error handling to return clear responses:

## 400 Bad Request for missing fields.

## 404 Not Found for invalid IDs.

## 500 Internal Server Error for server issues.
