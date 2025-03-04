// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import MapsGeolocation, { isUnexpected } from "../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";
import { AzureKeyCredential, AzureSASCredential } from "@azure/core-auth";
// @ts-ignore
import { AzureMapsManagementClient } from "@azure/arm-maps";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_TokenCredential", async () => {
    const credential = new DefaultAzureCredential();
    const client = MapsGeolocation(credential, "<maps-account-client-id>");
  });

  it("ReadmeSampleCreateClient_SubscriptionKey", async () => {
    const credential = new AzureKeyCredential("<subscription-key>");
    const client = MapsGeolocation(credential);
  });

  it("ReadmeSampleCreateClient_SASToken", async () => {
    const credential = new AzureSASCredential("<SAS Token>");
    const client = MapsGeolocation(credential);
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
    const client = MapsGeolocation(sasCredential);
  });

  it("ReadmeSampleGetCountryCode", async () => {
    const credential = new DefaultAzureCredential();
    const client = MapsGeolocation(credential, "<maps-account-client-id>");
    // @ts-preserve-whitespace
    const result = await client.path("/geolocation/ip/{format}", "json").get({
      queryParameters: { ip: "2001:4898:80e8:b::189" },
    });
    // @ts-preserve-whitespace
    if (isUnexpected(result)) {
      throw result.body.error;
    }
    // @ts-preserve-whitespace
    if (!result.body.countryRegion) {
      throw new Error("No country region was found for the IP address.");
    }
    // @ts-preserve-whitespace
    console.log(`The country code for the IP address is ${result.body.countryRegion.isoCode}`);
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
