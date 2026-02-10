// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ResourceConnectorManagementClient } = require("@azure/arm-resourceconnector");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the upgrade graph of an Appliance with a specified resource group and name and specific release train.
 *
 * @summary gets the upgrade graph of an Appliance with a specified resource group and name and specific release train.
 * x-ms-original-file: 2025-03-01-preview/UpgradeGraph.json
 */
async function getApplianceUpgradeGraph() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-2222-3333-4444-555555555555";
  const client = new ResourceConnectorManagementClient(credential, subscriptionId);
  const result = await client.appliances.getUpgradeGraph(
    "testresourcegroup",
    "appliance01",
    "stable",
  );
  console.log(result);
}

async function main() {
  await getApplianceUpgradeGraph();
}

main().catch(console.error);
