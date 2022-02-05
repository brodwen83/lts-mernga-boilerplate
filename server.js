const express = require('express');
const dotenv = require('dotenv');
// eslint-disable-next-line no-unused-vars
const colors = require('colors');
const path = require('path');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const cookieParser = require('cookie-parser');
const { applyMiddleware } = require('graphql-middleware');

const isAuth = require('./src/graphql/middlewares/isAuth');
const connectDB = require('./src/config/mongoDB');

const resolvers = require('./src/graphql/resolvers');
const QUERY = require('./src/graphql/schemas/rootQuery');
const MUTATION = require('./src/graphql/schemas/rootMutation');
const UserSchemaType = require('./src/graphql/schemas/userSchema');

// APIS
const confirmEmailToken = require('./src/api/confirmEmailToken');

const schema = makeExecutableSchema({
  typeDefs: [QUERY, MUTATION, UserSchemaType],
  resolvers,
});

const schemaWithMiddleware = applyMiddleware(schema, isAuth);

dotenv.config({ path: 'variables.env' });

const ALLOW_LOCALHOST_ORIGIN = {
  origin: ['http://localhost:3000', 'https://studio.apollographql.com'],
  credentials: true,
};

(async () => {
  const app = express();
  app.use(cors(ALLOW_LOCALHOST_ORIGIN));
  app.use(cookieParser());

  app.get('/api/v1/confirmation/:token', confirmEmailToken);

  const server = new ApolloServer({
    context: async context => context,
    schema: schemaWithMiddleware,
  });

  await server.start();

  server.applyMiddleware({
    app,
    cors: false,
  });

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }

  const PORT = process.env.PORT || 5000;

  await connectDB();
  app.listen({ port: PORT }, () =>
    // eslint-disable-next-line no-console
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`.yellow,
    ),
  );
})();
