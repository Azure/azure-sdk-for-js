// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftDatadogClient } from "@azure/arm-datadog";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a monitor resource.
 *
 * @summary delete a monitor resource.
 * x-ms-original-file: 2025-12-26-preview/Monitors_Delete.json
 */
async function monitorsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftDatadogClient(credential, subscriptionId);
  await client.monitors.delete("myResourceGroup", "myMonitor");
}

async function main(): Promise<void> {
  await monitorsDelete();
}

main().catch(console.error);
