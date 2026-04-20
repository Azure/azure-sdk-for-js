// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeLimitClient } from "@azure/arm-computelimit";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all compute limit features for the subscription at the specified location.
 *
 * @summary lists all compute limit features for the subscription at the specified location.
 * x-ms-original-file: 2026-03-20/Features_List.json
 */
async function listFeatures(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "74219ad7-63fc-442f-8037-4b43c627c07d";
  const client = new ComputeLimitClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.features.listBySubscriptionLocationResource("eastus")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listFeatures();
}

main().catch(console.error);
