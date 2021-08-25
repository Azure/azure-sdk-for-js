import * as coreClient from "@azure/core-client";

export const ClientTokenResponse: coreClient.CompositeMapper = {
  type: {
    name: "Composite",
    className: "ClientTokenResponse",
    modelProperties: {
      token: {
        serializedName: "token",
        type: {
          name: "String"
        }
      }
    }
  }
};
