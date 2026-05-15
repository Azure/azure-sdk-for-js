// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to nOTE: This feature is currently in preview and still being tested for stability. Gets the relative latency score for internet service providers from a specified location to Azure regions.
 *
 * @summary nOTE: This feature is currently in preview and still being tested for stability. Gets the relative latency score for internet service providers from a specified location to Azure regions.
 * x-ms-original-file: 2025-05-01/NetworkWatcherAzureReachabilityReportGet.json
 */
async function getAzureReachabilityReport(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkWatchers.getAzureReachabilityReport("rg1", "nw1", {
    azureLocations: ["West US"],
    endTime: new Date("2017-09-10T00:00:00Z"),
    providerLocation: { country: "United States", state: "washington" },
    providers: ["Frontier Communications of America, Inc. - ASN 5650"],
    startTime: new Date("2017-09-07T00:00:00Z"),
  });
  console.log(result);
}

async function main(): Promise<void> {
  await getAzureReachabilityReport();
}

main().catch(console.error);
