// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import MapsTimeZone, { isUnexpected } from "../src/index.js";
import { AzureKeyCredential, AzureSASCredential } from "@azure/core-auth";
import { DefaultAzureCredential } from "@azure/identity";
// @ts-ignore
import { AzureMapsManagementClient } from "@azure/arm-maps";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_TokenCredential", async () => {
    const credential = new DefaultAzureCredential();
    const client = MapsTimeZone(credential, "<maps-account-client-id>");
  });

  it("ReadmeSampleCreateClient_SubscriptionKey", async () => {
    const credential = new AzureKeyCredential("<subscription-key>");
    const client = MapsTimeZone(credential);
  });

  it("ReadmeSampleCreateClient_SASToken", async () => {
    const credential = new AzureSASCredential("<SAS Token>");
    const client = MapsTimeZone(credential);
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
    const client = MapsTimeZone(sasCredential);
  });

  it("ReadmeSampleGetTimezoneById", async () => {
    const credential = new DefaultAzureCredential();
    const client = MapsTimeZone(credential, "<maps-account-client-id>");
    // @ts-preserve-whitespace
    const response = await client.path("/timezone/byId/{format}", "json").get({
      queryParameters: {
        query: "America/New_York",
      },
    });
    // @ts-preserve-whitespace
    if (isUnexpected(response)) {
      throw response.body.error;
    }
    // @ts-preserve-whitespace
    const { ReferenceUtcTimestamp, TimeZones, Version } = response.body;
    console.log(`Reference UTC Timestamp: ${ReferenceUtcTimestamp}`);
    console.log(`Time Zones: ${TimeZones}`);
    console.log(`Version: ${Version}`);
  });

  it("ReadmeSampleGetTimezoneByCoordinates", async () => {
    const credential = new DefaultAzureCredential();
    const client = MapsTimeZone(credential, "<maps-account-client-id>");
    // @ts-preserve-whitespace
    const response = await client.path("/timezone/byCoordinates/{format}", "json").get({
      queryParameters: {
        query: [40.7128, -74.006],
      },
    });
    // @ts-preserve-whitespace
    if (isUnexpected(response)) {
      throw response.body.error;
    }
    // @ts-preserve-whitespace
    const { ReferenceUtcTimestamp, TimeZones, Version } = response.body;
    console.log(`Reference UTC Timestamp: ${ReferenceUtcTimestamp}`);
    console.log(`Time Zones: ${TimeZones}`);
    console.log(`Version: ${Version}`);
  });

  it("ReadmeSampleGetWindowsTimezoneIds", async () => {
    const credential = new DefaultAzureCredential();
    const client = MapsTimeZone(credential, "<maps-account-client-id>");
    // @ts-preserve-whitespace
    const response = await client.path("/timezone/enumWindows/{format}", "json").get();
    // @ts-preserve-whitespace
    if (isUnexpected(response)) {
      throw response.body.error;
    }
    // @ts-preserve-whitespace
    for (const timezone of response.body) {
      console.log(`Timezone: ${timezone}`);
    }
  });

  it("ReadmeSampleGetIanaTimezoneIds", async () => {
    const credential = new DefaultAzureCredential();
    const client = MapsTimeZone(credential, "<maps-account-client-id>");
    // @ts-preserve-whitespace
    const response = await client.path("/timezone/enumIana/{format}", "json").get();
    // @ts-preserve-whitespace
    if (isUnexpected(response)) {
      throw response.body.error;
    }
    // @ts-preserve-whitespace
    for (const timezone of response.body) {
      console.log(`Timezone: ${timezone}`);
    }
  });

  it("ReadmeSampleGetIanaVersion", async () => {
    const credential = new DefaultAzureCredential();
    const client = MapsTimeZone(credential, "<maps-account-client-id>");
    // @ts-preserve-whitespace
    const response = await client.path("/timezone/ianaVersion/{format}", "json").get();
    // @ts-preserve-whitespace
    if (isUnexpected(response)) {
      throw response.body.error;
    }
    // @ts-preserve-whitespace
    console.log(`IANA Version: ${response.body.Version}`);
  });

  it("ReadmeSampleConvertWindowsTimezoneToIana", async () => {
    const credential = new DefaultAzureCredential();
    const client = MapsTimeZone(credential, "<maps-account-client-id>");
    // @ts-preserve-whitespace
    const response = await client.path("/timezone/windowsToIana/{format}", "json").get({
      queryParameters: { query: "Eastern Standard Time" },
    });
    // @ts-preserve-whitespace
    if (isUnexpected(response)) {
      throw response.body.error;
    } else if (response.body) {
      console.log(`IANA Timezones: ${response.body}`);
    } else {
      console.error("No data returned");
    }
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
