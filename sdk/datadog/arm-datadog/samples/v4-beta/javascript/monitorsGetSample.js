// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftDatadogClient } = require("@azure/arm-datadog");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the properties of a specific monitor resource.
 *
 * @summary get the properties of a specific monitor resource.
 * x-ms-original-file: 2025-12-26-preview/Monitors_Get.json
 */
async function monitorsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftDatadogClient(credential, subscriptionId);
  const result = await client.monitors.get("myResourceGroup", "myMonitor");
  console.log(result);
}

async function main() {
  await monitorsGet();
}

main().catch(console.error);
