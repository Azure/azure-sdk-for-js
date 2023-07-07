// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const MapsSearch = require("@azure-rest/maps-search").default,
  { isUnexpected } = require("@azure-rest/maps-search");
const { AzureKeyCredential } = require("@azure/core-auth");
require("dotenv").config();

/**
 * @summary Demonstrate how to perform a fuzzy search for POIs along a specified route.
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

  /** Make the request. */
  const response = await client.path("/search/alongRoute/{format}", "json").post({
    queryParameters: { query: "burger", maxDetourTime: 1000, limit: 2 },
    body: {
      route: {
        coordinates: [
          [-122.143035, 47.653536],
          [-122.187164, 47.617556],
          [-122.114981, 47.570599],
          [-122.132756, 47.654009],
        ],
        type: "LineString",
      },
    },
  });

  /** Handle error response */
  if (isUnexpected(response)) {
    throw response.body.error;
  }

  /** Log the response body. */
  console.log(`"burger" search result along the route:\n`);
  response.body.results.forEach((result) => {
    console.log(`Address: ${result.address.freeformAddress}`);
    console.log(`Coordinate: (${result.position.lat}, ${result.position.lon})\n`);
  });
}

main().catch(console.error);
