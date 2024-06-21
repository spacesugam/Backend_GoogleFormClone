Backend Server
This repository contains a Node.js backend server built with Express.js for handling submissions and CRUD operations.

Installation

Clone the repository:

git clone <repository-url>
cd <repository-folder>
Install dependencies:

Ensure you have Node.js installed. Then, install the required npm packages.

npm install express fs
Additionally, if you are using TypeScript for development, install the TypeScript compiler:

npm install -g typescript
Running the Server

Compile TypeScript (if using TypeScript):

If your server.ts file is written in TypeScript, compile it to JavaScript using the TypeScript compiler (tsc):

tsc server.ts (or tsc)
This will generate a server.js file.

Start the server:

Run the server using Node.js:
node server.js
Replace server.js with server.ts if you haven't compiled TypeScript separately.

Server Endpoints
GET /ping: Responds with true to indicate server availability.

POST /submit: Accepts submissions and stores them in db.json.

GET /read?index=<index>: Retrieves a submission at the specified index from db.json.

DELETE /delete?index=<index>: Deletes a submission at the specified index from db.json.

PUT /edit?index=<index>: Updates a submission at the specified index in db.json.

Usage
Submitting Data:

Send a POST request to /submit with JSON payload containing name, email, phone, github_link, and stopwatch_time.

Reading Data:

Send a GET request to /read?index=<index> to retrieve a submission by index.

Deleting Data:

Send a DELETE request to /delete?index=<index> to delete a submission by index.

Updating Data:

Send a PUT request to /edit?index=<index> with JSON payload to update a submission by index.

Notes
Ensure db.json exists and is writable by the server process for storing submissions.
License
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgments
Express.js (https://expressjs.com/)
Node.js (https://nodejs.org/)
