# Timestamp Microservice

A Timestamp Microservice API built using Express JS which parses the input date and returns the UNIX and UTC timestamps for the provided input.

This microservice is built as a part of [freeCodeCamp Backend Development and APIs](https://www.freecodecamp.org/learn/back-end-development-and-apis/ "View the freeCodeCamp Backend Development APIs course") project.


This project taught me the following new skills:
- Netlify Serverless Functions
- Limiting the number of requests per minute to avoid crossing Netlify plan limits
- Simple way to build APIs using ExpressJS

---
Access the API using either of these 2 services:
- Netlify: [https://timestamp-api.netlify.app/api/](https://timestamp-api.netlify.app/api/ "Timestamp Microservice API hosted on Netlify")
- Replit: [https://timestamp-microservice.saideepd.repl.co/](https://timestamp-microservice.saideepd.repl.co/ "Timestamp Microservice API hosted on Replit")

---

### Example Usage:
- [[project url]/api/2015-12-25](https://timestamp-api.netlify.app/api/2022-01-15)
- [[project url]/api/1642204800000](https://timestamp-api.netlify.app/api/1451001600000)

### Example Output
```json
{
    "unix": 1642204800000,
    "utc": "Sat, 15 Jan 2022 00:00:00 GMT"
}
```
