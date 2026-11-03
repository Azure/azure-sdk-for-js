// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PeeringManagementClient } = require("@azure/arm-peering");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all connection monitor tests under the given subscription, resource group and peering service.
 *
 * @summary lists all connection monitor tests under the given subscription, resource group and peering service.
 * x-ms-original-file: 2025-05-01/ListConnectionMonitorTestsByPeeringService.json
 */
async function listAllConnectionMonitorTestsAssociatedWithThePeeringService() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId";
  const client = new PeeringManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.connectionMonitorTests.listByPeeringService(
    "rgName",
    "peeringServiceName",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAllConnectionMonitorTestsAssociatedWithThePeeringService();
}

main().catch(console.error);
