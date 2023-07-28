// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const MapsSearch = require("@azure-rest/maps-search").default,
  { isUnexpected } = require("@azure-rest/maps-search");
const { AzureKeyCredential } = require("@azure/core-auth");
require("dotenv").config();

/**
 * @summary Demonstrate how to search for POIs nearby the given position.
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

  const response = await client.path("/search/nearby/{format}", "json").get({
    queryParameters: { lat: 40.70627, lon: -74.011454, limit: 10, radius: 8046 },
  });
  /** Handle error response */
  if (isUnexpected(response)) {
    throw response.body.error;
  }
  /** Log response body */
  response.body.results.forEach((result) => {
    console.log(
      `${result.poi ? result.poi.name + ":" : ""} ${result.address.freeformAddress}. (${result.position.lat
      }, ${result.position.lon})\n`
    );
  });
}

main().catch(console.error);
