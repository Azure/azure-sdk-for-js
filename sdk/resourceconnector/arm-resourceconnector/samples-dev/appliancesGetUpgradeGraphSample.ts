// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the upgrade graph of an Appliance with a specified resource group and name and specific release train.
 *
 * @summary Gets the upgrade graph of an Appliance with a specified resource group and name and specific release train.
 * x-ms-original-file: specification/resourceconnector/resource-manager/Microsoft.ResourceConnector/stable/2022-10-27/examples/UpgradeGraph.json
 */

import { ResourceConnectorManagementClient } from "@azure/arm-resourceconnector";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getApplianceUpgradeGraph(): Promise<void> {
  const subscriptionId =
    process.env["RESOURCECONNECTOR_SUBSCRIPTION_ID"] || "11111111-2222-3333-4444-555555555555";
  const resourceGroupName = process.env["RESOURCECONNECTOR_RESOURCE_GROUP"] || "testresourcegroup";
  const resourceName = "appliance01";
  const upgradeGraph = "stable";
  const credential = new DefaultAzureCredential();
  const client = new ResourceConnectorManagementClient(credential, subscriptionId);
  const result = await client.appliances.getUpgradeGraph(
    resourceGroupName,
    resourceName,
    upgradeGraph,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getApplianceUpgradeGraph();
}

main().catch(console.error);
