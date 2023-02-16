// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const MapsGeolocation = require("@azure-rest/maps-geolocation").default,
  { isUnexpected } = require("@azure-rest/maps-geolocation");
const { AzureKeyCredential } = require("@azure/core-auth");
require("dotenv").config();

/**
 * @summary This sample demonstrates how to get the country code for an IP address using MapsGeolocation.
 */
async function successfullyRetrieveCountryCodeFromIPAddress() {
  /** Use subscription key authentication */
  const subscriptionKey = process.env.MAPS_SUBSCRIPTION_KEY || "";
  const credential = new AzureKeyCredential(subscriptionKey);
  const client = MapsGeolocation(credential);

  /** Or use Azure AD authentication */
  // const credential = new DefaultAzureCredential();
  // const mapsClientId = process.env.MAPS_CLIENT_ID || "";
  // const client = new MapsGeolocation(credential, mapsClientId);

  const result = await client.path("/geolocation/ip/{format}", "json").get({
    queryParameters: { ip: "2001:4898:80e8:b::189" },
  });

  if (isUnexpected(result)) {
    throw result.body.error;
  }
  if (!result.body.countryRegion) {
    throw new Error("No country region was found for the IP address.");
  }
  console.log(`The country code for the IP address is ${result.body.countryRegion.isoCode}`);
}

successfullyRetrieveCountryCodeFromIPAddress().catch(console.error);
