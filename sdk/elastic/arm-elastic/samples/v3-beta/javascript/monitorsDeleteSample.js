// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftElastic } = require("@azure/arm-elastic");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete an existing Elastic monitor resource from your Azure subscription, removing its observability and monitoring capabilities.
 *
 * @summary delete an existing Elastic monitor resource from your Azure subscription, removing its observability and monitoring capabilities.
 * x-ms-original-file: 2025-06-01/Monitors_Delete.json
 */
async function monitorsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftElastic(credential, subscriptionId);
  await client.monitors.delete("myResourceGroup", "myMonitor");
}

async function main() {
  await monitorsDelete();
}

main().catch(console.error);
