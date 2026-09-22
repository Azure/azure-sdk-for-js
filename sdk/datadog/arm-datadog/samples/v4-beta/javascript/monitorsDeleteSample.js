// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftDatadogClient } = require("@azure/arm-datadog");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a monitor resource.
 *
 * @summary delete a monitor resource.
 * x-ms-original-file: 2025-12-26-preview/Monitors_Delete.json
 */
async function monitorsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftDatadogClient(credential, subscriptionId);
  await client.monitors.delete("myResourceGroup", "myMonitor");
}

async function main() {
  await monitorsDelete();
}

main().catch(console.error);
