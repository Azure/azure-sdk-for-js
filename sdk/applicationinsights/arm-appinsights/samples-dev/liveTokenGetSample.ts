// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to **Gets an access token for live metrics stream data.**
 *
 * @summary **Gets an access token for live metrics stream data.**
 * x-ms-original-file: specification/applicationinsights/resource-manager/Microsoft.Insights/stable/2021-10-14/examples/LiveTokenGet.json
 */

import { ApplicationInsightsManagementClient } from "@azure/arm-appinsights";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getLiveTokenForResource(): Promise<void> {
  const resourceUri =
    "subscriptions/df602c9c-7aa0-407d-a6fb-eb20c8bd1192/resourceGroups/FabrikamFiberApp/providers/microsoft.insights/components/CustomAvailabilityTest/providers/microsoft.insights/generatelivetoken";
  const credential = new DefaultAzureCredential();
  const client = new ApplicationInsightsManagementClient(credential);
  const result = await client.liveToken.get(resourceUri);
  console.log(result);
}

async function main(): Promise<void> {
  await getLiveTokenForResource();
}

main().catch(console.error);
