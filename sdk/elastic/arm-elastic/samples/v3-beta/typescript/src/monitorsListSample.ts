// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftElastic } from "@azure/arm-elastic";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all Elastic monitor resources within a specified subscription, helping you audit and manage your monitoring setup.
 *
 * @summary list all Elastic monitor resources within a specified subscription, helping you audit and manage your monitoring setup.
 * x-ms-original-file: 2025-06-01/Monitors_List.json
 */
async function monitorsList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftElastic(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.monitors.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await monitorsList();
}

main().catch(console.error);
