// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftElastic } = require("@azure/arm-elastic");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get detailed properties of a specific Elastic monitor resource, helping you manage observability and performance.
 *
 * @summary get detailed properties of a specific Elastic monitor resource, helping you manage observability and performance.
 * x-ms-original-file: 2025-06-01/Monitors_Get.json
 */
async function monitorsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftElastic(credential, subscriptionId);
  const result = await client.monitors.get("myResourceGroup", "myMonitor");
  console.log(result);
}

async function main() {
  await monitorsGet();
}

main().catch(console.error);
