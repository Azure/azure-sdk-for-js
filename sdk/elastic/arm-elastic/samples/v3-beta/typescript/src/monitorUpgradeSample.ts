// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftElastic } from "@azure/arm-elastic";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to upgrade the Elastic monitor resource to a newer version, ensuring optimal observability and performance.
 *
 * @summary upgrade the Elastic monitor resource to a newer version, ensuring optimal observability and performance.
 * x-ms-original-file: 2026-03-15-preview/Monitor_Upgrade.json
 */
async function monitorUpgrade(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftElastic(credential, subscriptionId);
  await client.monitor.upgrade("myResourceGroup", "myMonitor");
}

async function main(): Promise<void> {
  await monitorUpgrade();
}

main().catch(console.error);
