// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { TrafficManagerManagementClient } = require("@azure/arm-trafficmanager");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all Traffic Manager profiles within a resource group.
 *
 * @summary lists all Traffic Manager profiles within a resource group.
 * x-ms-original-file: 2024-04-01-preview/Profile-GET-ByResourceGroup.json
 */
async function listProfilesByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new TrafficManagerManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.profiles.listByResourceGroup(
    "azuresdkfornetautoresttrafficmanager3640",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listProfilesByResourceGroup();
}

main().catch(console.error);
