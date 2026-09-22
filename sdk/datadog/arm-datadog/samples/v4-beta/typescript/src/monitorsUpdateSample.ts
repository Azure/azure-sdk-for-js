// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MicrosoftDatadogClient } from "@azure/arm-datadog";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a monitor resource.
 *
 * @summary update a monitor resource.
 * x-ms-original-file: 2025-12-26-preview/Monitors_Update.json
 */
async function monitorsUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftDatadogClient(credential, subscriptionId);
  const result = await client.monitors.update("myResourceGroup", "myMonitor", {
    body: { properties: { monitoringStatus: "Enabled" }, tags: { Environment: "Dev" } },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await monitorsUpdate();
}

main().catch(console.error);
