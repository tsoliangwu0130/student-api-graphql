import { GraphQLID, GraphQLList, GraphQLString } from "graphql";
import { PersonIdentificationType } from "../types";
import { PersonIdentificationService } from "../../services";

const PersonIdentificationQuery = {
  type: PersonIdentificationType,
  description: "Retrieves identification information for person matching" +
    " the bannerId provided.",
  args: {
    bannerId: {
      type: GraphQLID,
      description: "The identification number used to access a person"
    }
  },
  // TODO: implement other arguments?
  resolve: (root, args, context) =>
    new PersonIdentificationService(context).load(args.bannerId)
};

const PersonIdentificationsQuery = {
  type: new GraphQLList(PersonIdentificationType),
  description: "Retrieves the list of all the various identification" +
    " information for persons matching the identifiers provided.",
  args: {
    bannerId: {
      type: GraphQLString,
      description: "The identification number used to access a person"
    },
    enterpriseId: {
      type: GraphQLString,
      description: "The identifier used by BEIS for identity" +
        " synchronization"
    },
    ldapUserMapping: {
      type: GraphQLString,
      description: "The identifier used in GOBTPAC for mapping ldap" +
        " authentication (GOBTPAC_LDAP_USER)"
    },
    externalUser: {
      type: GraphQLString,
      description: "The username generated by Banner for new accounts" +
        " (GOBTPAC_EXTERNAL_USER)"
    },
    sourcedId: {
      type: GraphQLString,
      description: "The Permanent, unique identifier for a person" +
        " required for IMS data transfers"
    }
  },
  resolve: (root, args, context) =>
    new PersonIdentificationService(context).list(args)
};

export { PersonIdentificationQuery, PersonIdentificationsQuery };
