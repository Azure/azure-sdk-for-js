// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import MapsSearch, { isUnexpected } from "@azure-rest/maps-search";
import { AzureKeyCredential } from "@azure/core-auth";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * @summary Demonstrate how to search for POIs by category.
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
  const response = await client.path("/search/poi/category/{format}", "json").get({
    queryParameters: {
      /** You can get the supported categories from the path /search/poi/category/tree/ here: https://learn.microsoft.com/en-us/azure/azure-maps/supported-search-categories */
      query: "DENTIST",
      limit: 3,
      lat: 40.758953,
      lon: -73.985263,
      radius: 3200,
    },
  });

  /** Handle error response */
  if (isUnexpected(response)) {
    throw response.body.error;
  }
  /** Log response body */
  response.body.results.forEach((result) => {
    console.log(
      `${result.poi ? result.poi.name + ":" : ""} ${result.address.freeformAddress}. (${
        result.position.lat
      }, ${result.position.lon})\n`
    );
  });
}

main().catch(console.error);
