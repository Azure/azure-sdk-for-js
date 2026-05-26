// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApplicationInsightsManagementClient } = require("@azure/arm-appinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to **Gets an access token for live metrics stream data.**
 *
 * @summary **Gets an access token for live metrics stream data.**
 * x-ms-original-file: 2021-10-14/LiveTokenGet.json
 */
async function getLiveTokenForResource() {
  const credential = new DefaultAzureCredential();
  const client = new ApplicationInsightsManagementClient(credential);
  const result = await client.liveToken.get(
    "subscriptions/df602c9c-7aa0-407d-a6fb-eb20c8bd1192/resourceGroups/FabrikamFiberApp/providers/microsoft.insights/components/CustomAvailabilityTest/providers/microsoft.insights/generatelivetoken",
  );
  console.log(result);
}

async function main() {
  await getLiveTokenForResource();
}

main().catch(console.error);
