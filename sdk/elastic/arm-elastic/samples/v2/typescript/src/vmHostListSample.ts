// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftElastic } from "@azure/arm-elastic";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all VM resources currently being monitored by the Elastic monitor resource, helping you manage observability.
 *
 * @summary list all VM resources currently being monitored by the Elastic monitor resource, helping you manage observability.
 * x-ms-original-file: 2025-06-01/VMHost_List.json
 */
async function vmHostList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftElastic(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.vmHost.list("myResourceGroup", "myMonitor")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await vmHostList();
}

main().catch(console.error);
