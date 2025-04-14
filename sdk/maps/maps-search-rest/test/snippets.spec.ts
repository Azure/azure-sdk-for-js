// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import MapsSearch, { isUnexpected } from "../src/index.js";
import { AzureKeyCredential, AzureSASCredential } from "@azure/core-auth";
import { DefaultAzureCredential } from "@azure/identity";
// @ts-ignore
import { AzureMapsManagementClient } from "@azure/arm-maps";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_TokenCredential", async () => {
    const credential = new DefaultAzureCredential();
    const client = MapsSearch(credential, "<maps-account-client-id>");
  });

  it("ReadmeSampleCreateClient_SubscriptionKey", async () => {
    const credential = new AzureKeyCredential("<subscription-key>");
    const client = MapsSearch(credential);
  });

  it("ReadmeSampleCreateClient_SASToken", async () => {
    const credential = new AzureSASCredential("<SAS Token>");
    const client = MapsSearch(credential);
  });

  it("ReadmeSampleCreateClient_SAS", async () => {
    const subscriptionId = "<subscription ID of the map account>";
    const resourceGroupName = "<resource group name of the map account>";
    const accountName = "<name of the map account>";
    const mapsAccountSasParameters = {
      start: "<start time in ISO format>", // e.g. "2023-11-24T03:51:53.161Z"
      expiry: "<expiry time in ISO format>", // maximum value to start + 1 day
      maxRatePerSecond: 500,
      principalId: "<principle ID (object ID) of the managed identity>",
      signingKey: "primaryKey",
    };
    // @ts-preserve-whitespace
    const credential = new DefaultAzureCredential();
    const managementClient = new AzureMapsManagementClient(credential, subscriptionId);
    const { accountSasToken } = await managementClient.accounts.listSas(
      resourceGroupName,
      accountName,
      mapsAccountSasParameters,
    );
    // @ts-preserve-whitespace
    if (accountSasToken === undefined) {
      throw new Error("No accountSasToken was found for the Maps Account.");
    }
    // @ts-preserve-whitespace
    const sasCredential = new AzureSASCredential(accountSasToken);
    const client = MapsSearch(sasCredential);
  });

  it("ReadmeSampleGeocode", async () => {
    const credential = new DefaultAzureCredential();
    const client = MapsSearch(credential, "<maps-account-client-id>");
    // @ts-preserve-whitespace
    /** Make a request to the geocoding API */
    const response = await client
      .path("/geocode")
      .get({ queryParameters: { query: "400 Broad, Seattle" } });
    // @ts-preserve-whitespaces
    /** Handle error response */
    if (isUnexpected(response)) {
      throw response.body.error;
    }
    // @ts-preserve-whitespace
    /** Log the response body. */
    if (!response.body.features) {
      console.log(`No coordinates found for the address.`);
    } else {
      console.log(`The followings are the possible coordinates of the address:`);
      for (const result of response.body.features) {
        const [lon, lat] = result.geometry.coordinates;
        console.log(`Latitude: ${lat}, Longitude ${lon}`);
        console.log("Postal code: ", result.properties?.address?.postalCode);
        console.log("Admin districts: ", result.properties?.address?.adminDistricts?.join(", "));
        console.log("Country region: ", result.properties?.address?.countryRegion);
      }
    }
  });

  it("ReadmeSampleReverseGeocode", async () => {
    const credential = new DefaultAzureCredential();
    const client = MapsSearch(credential, "<maps-account-client-id>");
    // @ts-preserve-whitespace
    /** Make the request. */
    const response = await client.path("/reverseGeocode").get({
      queryParameters: { coordinates: [-121.89, 37.337] }, // [longitude, latitude],
    });
    // @ts-preserve-whitespace
    /** Handle error response. */
    if (isUnexpected(response)) {
      throw response.body.error;
    }
    // @ts-preserve-whitespace
    if (!response.body.features || response.body.features.length === 0) {
      console.log("No results found.");
    } else {
      /** Log the response body. */
      for (const feature of response.body.features) {
        if (feature.properties?.address?.formattedAddress) {
          console.log(feature.properties.address.formattedAddress);
        } else {
          console.log("No address found.");
        }
      }
    }
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
