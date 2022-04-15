// GraphQL provides scalar types
import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLFloat,
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
} from "graphql";

import { procurementCenters } from "./procurement-centers";

// Creating a custom listing type using GraphQLObjectType class
const ProcurementCenter = new GraphQLObjectType({
  name: "ProcurementCenter",
  fields: {
    id: {
      // Unique Identifier which gets serialized as string
      type: GraphQLID,
    },
    // For field to be non-null use GraphQLNonNull marker
    centerName: { type: GraphQLNonNull(GraphQLString) },
    address: { type: GraphQLNonNull(GraphQLString) },
    city: { type: GraphQLNonNull(GraphQLString) },
    state: { type: GraphQLNonNull(GraphQLString) },
    rate: { type: GraphQLNonNull(GraphQLFloat) },
    totalCapacity: { type: GraphQLNonNull(GraphQLFloat) },
    availableCapacity: { type: GraphQLNonNull(GraphQLFloat) },
    farmerBookings: {
      type: GraphQLNonNull(GraphQLList(GraphQLNonNull(GraphQLString))),
    },
    industryBookings: {
      type: GraphQLNonNull(GraphQLList(GraphQLNonNull(GraphQLString))),
    },
    transactionIds: {
      type: GraphQLNonNull(GraphQLList(GraphQLNonNull(GraphQLString))),
    },
  },
});

const query = new GraphQLObjectType({
  name: "Query",
  fields: {
    procurementCenters: {
      // Returns a non-nullable list of non-null procurement centers
      type: GraphQLNonNull(GraphQLList(GraphQLNonNull(ProcurementCenter))),
      resolve: () => {
        return procurementCenters;
      },
    },
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    deleteProcurementCenter: {
      type: GraphQLNonNull(ProcurementCenter),
      args: {
        id: {
          type: GraphQLNonNull(GraphQLID),
        },
      },
      // Resolvers have access to upto 4 arguments. `root` conveys that root object is passed to root object `type`. Destruct the id from arguments
      resolve: (_root, { id }) => {
        for (let i = 0; i < procurementCenters.length; i++) {
          if (procurementCenters[i].id === id) {
            return procurementCenters.splice(i, 1)[0];
          }
        }

        throw new Error("Failed to delete procurement center");
      },
    },
  },
});

export const schema = new GraphQLSchema({ query, mutation });
