// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftElastic } from "@azure/arm-elastic";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all traffic filters associated with your Elastic monitor resource, helping you manage network traffic control.
 *
 * @summary list all traffic filters associated with your Elastic monitor resource, helping you manage network traffic control.
 * x-ms-original-file: 2025-06-01/AllTrafficFilters_list.json
 */
async function allTrafficFiltersList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftElastic(credential, subscriptionId);
  const result = await client.allTrafficFilters.list("myResourceGroup", "myMonitor");
  console.log(result);
}

async function main(): Promise<void> {
  await allTrafficFiltersList();
}

main().catch(console.error);
