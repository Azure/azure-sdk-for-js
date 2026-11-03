// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorClient } from "@azure/arm-monitor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specified NSP configuration for the specified data collection endpoint.
 *
 * @summary gets the specified NSP configuration for the specified data collection endpoint.
 * x-ms-original-file: 2021-10-01/NSPForDataCollectionEndpoints_Get.json
 */
async function getNSPConfigsByNameForDataCollectionEndpoint(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.dataCollectionEndpoints.getNSP(
    "exampleRG",
    "someDataCollectionEndpoint",
    "somePerimeterConfiguration",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getNSPConfigsByNameForDataCollectionEndpoint();
}

main().catch(console.error);
