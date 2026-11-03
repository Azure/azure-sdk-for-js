// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ResourceConnectorManagementClient } = require("@azure/arm-resourceconnector");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a list of Appliances in the specified subscription and resource group. The operation returns properties of each Appliance.
 *
 * @summary gets a list of Appliances in the specified subscription and resource group. The operation returns properties of each Appliance.
 * x-ms-original-file: 2025-03-01-preview/AppliancesListByResourceGroup.json
 */
async function listAppliancesByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-2222-3333-4444-555555555555";
  const client = new ResourceConnectorManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.appliances.listByResourceGroup("testresourcegroup")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAppliancesByResourceGroup();
}

main().catch(console.error);
