// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftElastic } from "@azure/arm-elastic";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update the VM details that will be monitored by the Elastic monitor resource, ensuring optimal observability and performance.
 *
 * @summary update the VM details that will be monitored by the Elastic monitor resource, ensuring optimal observability and performance.
 * x-ms-original-file: 2025-06-01/VMCollection_Update.json
 */
async function vmCollectionUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftElastic(credential, subscriptionId);
  await client.vmCollection.update("myResourceGroup", "myMonitor");
}

async function main(): Promise<void> {
  await vmCollectionUpdate();
}

main().catch(console.error);
