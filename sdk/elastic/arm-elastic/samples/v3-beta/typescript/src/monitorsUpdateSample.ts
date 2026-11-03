// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftElastic } from "@azure/arm-elastic";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update an existing Elastic monitor resource in your Azure subscription, ensuring optimal observability and performance.
 *
 * @summary update an existing Elastic monitor resource in your Azure subscription, ensuring optimal observability and performance.
 * x-ms-original-file: 2025-06-01/Monitors_Update.json
 */
async function monitorsUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftElastic(credential, subscriptionId);
  const result = await client.monitors.update("myResourceGroup", "myMonitor");
  console.log(result);
}

async function main(): Promise<void> {
  await monitorsUpdate();
}

main().catch(console.error);
