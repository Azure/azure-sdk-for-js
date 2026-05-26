// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PeeringManagementClient } = require("@azure/arm-peering");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all registered prefixes under the given subscription, resource group and peering.
 *
 * @summary lists all registered prefixes under the given subscription, resource group and peering.
 * x-ms-original-file: 2025-05-01/ListRegisteredPrefixesByPeering.json
 */
async function listAllTheRegisteredPrefixesAssociatedWithThePeering() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId";
  const client = new PeeringManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.registeredPrefixes.listByPeering("rgName", "peeringName")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAllTheRegisteredPrefixesAssociatedWithThePeering();
}

main().catch(console.error);
