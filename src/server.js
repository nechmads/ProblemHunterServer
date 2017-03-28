'use strict';

import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress } from 'graphql-server-express';
import { graphiqlExpress } from 'graphql-server-express';
import Problem from './models/problem';
import Schema from './api/schema/schema';
import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/problem_hunter");

var app = express();
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: Schema }));
app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

app.listen(3000);

