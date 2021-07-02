const express = require('express');
const { loadSchemaSync } = require('@graphql-tools/load');
const { GraphQLFileLoader } = require('@graphql-tools/graphql-file-loader');
const { addResolversToSchema } = require('@graphql-tools/schema');
const { graphqlHTTP } = require('express-graphql');
const { join } = require('path');

const schema = loadSchemaSync(join(__dirname, 'schema/schema.graphql'), {
    loaders: [
      new GraphQLFileLoader(),
    ]
  });

const resolvers = {
    Query: {
        test(_, args) {
            return args.param
        }
    }
}

const schemaWithResolvers = addResolversToSchema({
    schema,
    resolvers,
});

const app = express();

app.use(
    graphqlHTTP({
        schema: schemaWithResolvers,
        graphiql: true,
    })
);

app.listen(4000, () => {
    console.info(`Server listening on http://localhost:4000`)
})