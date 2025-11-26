// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MicrosoftElastic } = require("@azure/arm-elastic");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Upgrade the Elastic monitor resource to a newer version, ensuring optimal observability and performance.
 *
 * @summary Upgrade the Elastic monitor resource to a newer version, ensuring optimal observability and performance.
 * x-ms-original-file: specification/elastic/resource-manager/Microsoft.Elastic/stable/2025-06-01/examples/Monitor_Upgrade.json
 */
async function monitorUpgrade() {
  const subscriptionId =
    process.env["ELASTIC_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["ELASTIC_RESOURCE_GROUP"] || "myResourceGroup";
  const monitorName = "myMonitor";
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftElastic(credential, subscriptionId);
  const result = await client.monitor.beginUpgradeAndWait(resourceGroupName, monitorName);
  console.log(result);
}

async function main() {
  await monitorUpgrade();
}

main().catch(console.error);
