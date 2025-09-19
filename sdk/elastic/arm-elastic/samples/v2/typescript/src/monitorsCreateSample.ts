// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftElastic } from "@azure/arm-elastic";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a new Elastic monitor resource in your Azure subscription, enabling observability and monitoring of your Azure resources through Elastic.
 *
 * @summary create a new Elastic monitor resource in your Azure subscription, enabling observability and monitoring of your Azure resources through Elastic.
 * x-ms-original-file: 2025-06-01/Monitors_Create.json
 */
async function monitorsCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftElastic(credential, subscriptionId);
  const result = await client.monitors.create("myResourceGroup", "myMonitor");
  console.log(result);
}

async function main(): Promise<void> {
  await monitorsCreate();
}

main().catch(console.error);
