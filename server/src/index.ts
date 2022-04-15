import express from "express";
import { ApolloServer } from 'apollo-server-express';
import { schema } from './graphql';

const app = express();
const PORT = 9000;
const server = new ApolloServer({schema});

server.applyMiddleware({ app, path: '/api' });

app.get("/", (_req, res) => {
  res.send("Weclome to StubbleMart!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server is listening at port ${PORT}...`);
  console.log(`[app]: http://localhost:${PORT}`);
});
