// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NewRelicObservability } from "@azure/arm-newrelicobservability";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all Azure resources that are linked to the same New Relic organization as the specified monitor resource, helping you understand the scope of integration
 *
 * @summary lists all Azure resources that are linked to the same New Relic organization as the specified monitor resource, helping you understand the scope of integration
 * x-ms-original-file: 2025-05-01-preview/LinkedResources_List.json
 */
async function monitorsListLinkedResources(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NewRelicObservability(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.monitors.listLinkedResources("myResourceGroup", "myMonitor")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await monitorsListLinkedResources();
}

main().catch(console.error);
