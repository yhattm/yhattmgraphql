const { ApolloServer, gql } = require("apollo-server");

const invest = require("./src/modules/invest");

const typeDefs = gql`
  type Option {
    call: Float
    put: Float
  }

  type Stock {
    FIMTX1: Float
    FIMTX2: Float
    FIMTXDiff: Float
  }

  type Exchange {
    currency: String
    price: Float
    buy: Float
    sell: Float
  }

  type Gold {
    price: Float
    buy: Float
    sell: Float
  }

  type Query {
    """
    (date: "201810W5", target: "9750")
    """
    option(date: String, target: String): Option
    stock: Stock
    exchanges: [Exchange]
    gold: Gold
  }
`;

const resolvers = {
  Query: {
    option: (obj, args, context, info) =>
      invest.getOption({ date: args.date, target: args.target }),
    stock: () => invest.getStock(),
    exchanges: () => invest.getExchanges(),
    gold: () => invest.getGold()
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
