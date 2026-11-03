// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PeeringManagementClient } = require("@azure/arm-peering");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all registered ASNs under the given subscription, resource group and peering.
 *
 * @summary lists all registered ASNs under the given subscription, resource group and peering.
 * x-ms-original-file: 2025-05-01/ListRegisteredAsnsByPeering.json
 */
async function listAllTheRegisteredASNsAssociatedWithThePeering() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId";
  const client = new PeeringManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.registeredAsns.listByPeering("rgName", "peeringName")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAllTheRegisteredASNsAssociatedWithThePeering();
}

main().catch(console.error);
