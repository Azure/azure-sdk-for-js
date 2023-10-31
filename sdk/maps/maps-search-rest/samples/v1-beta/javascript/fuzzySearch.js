// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const MapsSearch = require("@azure-rest/maps-search").default,
  { isUnexpected } = require("@azure-rest/maps-search");
const { AzureKeyCredential } = require("@azure/core-auth");
// import { DefaultAzureCredential } from "@azure/identity";
require("dotenv").config();

/**
 * @summary This sample demonstrates how to use the fuzzy search with MapsSearchClient.
 */
async function main() {
  /**
   * Azure Maps supports two ways to authenticate requests:
   * - Shared Key authentication (subscription-key)
   * - Azure Active Directory (Azure AD) authentication
   *
   * In this sample you can put MAPS_SUBSCRIPTION_KEY into .env file to use the first approach or populate
   * the three AZURE_CLIENT_ID, AZURE_CLIENT_SECRET & AZURE_TENANT_ID variables for trying out AAD auth.
   *
   * More info is available at https://docs.microsoft.com/en-us/azure/azure-maps/azure-maps-authentication.
   */
  /** Shared Key authentication (subscription-key) */
  const subscriptionKey = process.env.MAPS_SUBSCRIPTION_KEY || "";
  const credential = new AzureKeyCredential(subscriptionKey);
  const client = MapsSearch(credential);

  /** Azure Active Directory (Azure AD) authentication */
  // const credential = new DefaultAzureCredential();
  // const mapsClientId = process.env.MAPS_RESOURCE_CLIENT_ID || "";
  // const client = MapsSearch(credential, mapsClientId);

  /** Search for Starbuck near Seattle */
  const response = await client.path("/search/fuzzy/{format}", "json").get({
    queryParameters: {
      query: "Starbucks",
      lat: 47.6101,
      lon: -122.34255,
      countrySet: ["US"],
    },
  });
  /** Handle the error response */
  if (isUnexpected(response)) {
    throw response.body.error;
  }

  /** Log the response body */
  console.log(`Starbucks search result near Seattle:\n`);
  response.body.results.forEach((result) => {
    console.log(`Address: ${result.address.freeformAddress}`);
    console.log(`Coordinate: (${result.position.lat}, ${result.position.lon})\n`);
  });
}

main().catch(console.error);
