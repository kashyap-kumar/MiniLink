# MiniLink

## Introduction

MiniLink is a **URL shortener service** using Node.js, Express, and MongoDB. Being my first Node.js project, I have learnt how to set up the server, connect to a MongoDB database, and implement the functionality to shorten and redirect URLs.

## Technology/tool

- Node.js
- Express
- MongoDB

## How to use

- Clone this repository: `git clone https://github.com/kashyap-kumar/MiniLink.git`
- Move to the project directory: `cd MiniLink`
- Install required packages: `npm install`
- Start server: `npm start`
- Generate short url: Send a `POST` request to `/url` endpoint with a JSON body containing the URL in the format `{ "url": "www.example.com" }`.
- Response: `{ "id": "y9ATvO0M" }`
- Visit: `localhost:3000/y9ATvO0M`

Thanks for visiting 