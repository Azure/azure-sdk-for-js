// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftElastic } = require("@azure/arm-elastic");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to upgrade the Elastic monitor resource to a newer version, ensuring optimal observability and performance.
 *
 * @summary upgrade the Elastic monitor resource to a newer version, ensuring optimal observability and performance.
 * x-ms-original-file: 2025-06-01/Monitor_Upgrade.json
 */
async function monitorUpgrade() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new MicrosoftElastic(credential, subscriptionId);
  await client.monitor.upgrade("myResourceGroup", "myMonitor");
}

async function main() {
  await monitorUpgrade();
}

main().catch(console.error);
