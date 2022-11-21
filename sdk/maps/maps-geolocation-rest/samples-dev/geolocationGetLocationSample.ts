// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createMapsGeolocationClient, {
  GeolocationGetLocationParameters
} from "@azure-rest/maps-geolocation";
import { AzureKeyCredential } from "@azure/core-auth";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to 
**Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).


This service will return the ISO country code for the provided IP address. Developers can use this information  to block or alter certain content based on geographical locations where the application is being viewed from.
 *
 * @summary 
**Applies to:** see pricing [tiers](https://aka.ms/AzureMapsPricingTier).


This service will return the ISO country code for the provided IP address. Developers can use this information  to block or alter certain content based on geographical locations where the application is being viewed from.
 * x-ms-original-file: specification/maps/data-plane/Geolocation/preview/1.0/examples/SuccessfulGetCountryCodeFromIP.json
 */
async function successfullyRetrieveCountryCodeFromIPAddress() {
  const credential = new AzureKeyCredential("{Your API key}");
  const client = createMapsGeolocationClient(credential);
  const format = "json";
  const options: GeolocationGetLocationParameters = {
    queryParameters: { ip: "2001:4898:80e8:b::189" }
  };
  const result = await client
    .path("/geolocation/ip/{format}", format)
    .get(options);
  console.log(result);
}

successfullyRetrieveCountryCodeFromIPAddress().catch(console.error);
