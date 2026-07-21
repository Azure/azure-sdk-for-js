// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NewRelicObservability } from "@azure/arm-newrelicobservability";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieves a list of all New Relic monitor resources either a specific resource group
 *
 * @summary retrieves a list of all New Relic monitor resources either a specific resource group
 * x-ms-original-file: 2025-05-01-preview/Monitors_ListByResourceGroup_MaximumSet_Gen.json
 */
async function monitorsListByResourceGroupMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NewRelicObservability(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.monitors.listByResourceGroup("rgNewRelic")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await monitorsListByResourceGroupMaximumSetGen();
}

main().catch(console.error);
