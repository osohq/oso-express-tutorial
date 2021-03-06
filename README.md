This is a tutorial app designed to help you learn about integrating Oso into your system and writing authorization rules. The app uses the Express framework for Node, and is written in Typescript. It also includes a small sqlite database.

To spin up the app, ensure you have [node](https://nodejs.org/en/) and [sqlite3](https://www.sqlite.org/index.html) installed on your system, then follow these steps:

1. Install project dependencies.

```
npm install
```

2. Instantiate the database.

```
sqlite3 expenses.db ".read expenses.sql"
```

3. Start the server.

```
npm run start
```

When the server starts, you should see output similar to this:

```
The application is listening on port 3000!
```

The project does not include Oso yet -- we leave that part up to you! Please [follow the tutorial](https://docs.osohq.com/node/getting-started/application.html) to get started.

