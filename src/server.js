'use strict';

import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress } from 'graphql-server-express';
import Problem from './models/problem';

var app = express();
//app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: myGraphQLSchema }));
app.listen(3000);

