// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to list Fleet resources by subscription ID
 *
 * @summary list Fleet resources by subscription ID
 * x-ms-original-file: 2024-11-01/Fleets_ListBySubscription.json
 */

import { AzureFleetClient } from "@azure/arm-computefleet";
import { DefaultAzureCredential } from "@azure/identity";

async function fleetsListBySubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1DC2F28C-A625-4B0E-9748-9885A3C9E9EB";
  const client = new AzureFleetClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.fleets.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await fleetsListBySubscription();
}

main().catch(console.error);
