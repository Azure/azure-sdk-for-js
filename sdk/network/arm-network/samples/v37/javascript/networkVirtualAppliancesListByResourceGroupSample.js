// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all Network Virtual Appliances in a resource group.
 *
 * @summary lists all Network Virtual Appliances in a resource group.
 * x-ms-original-file: 2025-05-01/NetworkVirtualApplianceListByResourceGroup.json
 */
async function listAllNetworkVirtualApplianceForAGivenResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.networkVirtualAppliances.listByResourceGroup("rg1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAllNetworkVirtualApplianceForAGivenResourceGroup();
}

main().catch(console.error);
