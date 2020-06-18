const { ApolloServer, gql } = require("apollo-server");
const { invest } = require("tslib");

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
      invest.GetOption({ date: args.date, target: args.target }),
    stock: () => invest.GetStock(),
    exchanges: () => invest.GetExchanges(),
    gold: () => invest.GetGold()
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
