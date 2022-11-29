// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import MapsSearch, { isUnexpected } from "@azure-rest/maps-search";
import { AzureKeyCredential } from "@azure/core-auth";
import * as dotenv from "dotenv";

dotenv.config();

/**
Azure Address Geocoding can also be accessed for  structured address look up exclusively. The geocoding search index will be queried for everything above the  street level data. No POIs will be returned. Note that the geocoder is very tolerant of typos and incomplete  addresses. It will also handle everything from exact  street addresses or street or intersections as well as higher level geographies such as city centers,  counties, states etc.
 *
 * @summary Demonstrate how to search the coordinates of an address with a structured format.
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
  // const mapsClientId = process.env.MAPS_CLIENT_ID || "";
  // const client = MapsRoute(credential, mapsClientId);

  const response = await client.path("/search/address/structured/{format}", "json").get({
    queryParameters: {
      countryCode: "US",
      streetNumber: "15127",
      streetName: "NE%2024th%20Street",
      municipality: "Redmond",
      countrySubdivision: "WA",
      postalCode: "98052",
    },
  });
  /** Handle error response */
  if (isUnexpected(response)) {
    throw response.body.error;
  }

  /** Log the response body. */
  console.log(`The followings are the possible coordinates of the address:`);
  response.body.results.forEach((result) => {
    const { lat, lon } = result.position;
    console.log(`(${lat}, ${lon})`);
  });
}

main().catch(console.error);
