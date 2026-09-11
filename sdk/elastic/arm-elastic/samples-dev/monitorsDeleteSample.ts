// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftElastic } from "@azure/arm-elastic";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete an existing Elastic monitor resource from your Azure subscription, removing its observability and monitoring capabilities.
 *
 * @summary delete an existing Elastic monitor resource from your Azure subscription, removing its observability and monitoring capabilities.
 * x-ms-original-file: 2026-03-15-preview/Monitors_Delete.json
 */
async function monitorsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftElastic(credential, subscriptionId);
  await client.monitors.delete("myResourceGroup", "myMonitor", { softDelete: false });
}

/**
 * This sample demonstrates how to delete an existing Elastic monitor resource from your Azure subscription, removing its observability and monitoring capabilities.
 *
 * @summary delete an existing Elastic monitor resource from your Azure subscription, removing its observability and monitoring capabilities.
 * x-ms-original-file: 2026-03-15-preview/Monitors_Delete_SoftDelete.json
 */
async function monitorsDeleteSoftDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftElastic(credential, subscriptionId);
  await client.monitors.delete("myResourceGroup", "myMonitor", { softDelete: true });
}

async function main(): Promise<void> {
  await monitorsDelete();
  await monitorsDeleteSoftDelete();
}

main().catch(console.error);
