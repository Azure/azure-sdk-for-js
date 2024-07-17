// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import MapsGeolocation, { isUnexpected } from "@azure-rest/maps-geolocation";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * @summary This sample demonstrates how to get the country code for an IP address using MapsGeolocation.
 */
async function successfullyRetrieveCountryCodeFromIPAddress(): Promise<void> {
  /** Use Azure AD authentication (Recommended) */
  const credential = new DefaultAzureCredential();
  const mapsClientId = process.env.MAPS_RESOURCE_CLIENT_ID || "";
  const client = MapsGeolocation(credential, mapsClientId);
  
  /** Or use subscription key authentication */
  // const subscriptionKey = process.env.MAPS_SUBSCRIPTION_KEY || "";
  // const credential = new AzureKeyCredential(subscriptionKey);
  // const client = MapsGeolocation(credential);

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
