// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PeeringManagementClient } = require("@azure/arm-peering");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an existing registered ASN with the specified name under the given subscription, resource group and peering.
 *
 * @summary deletes an existing registered ASN with the specified name under the given subscription, resource group and peering.
 * x-ms-original-file: 2025-05-01/DeleteRegisteredAsn.json
 */
async function deletesARegisteredASNAssociatedWithThePeering() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId";
  const client = new PeeringManagementClient(credential, subscriptionId);
  await client.registeredAsns.delete("rgName", "peeringName", "registeredAsnName");
}

async function main() {
  await deletesARegisteredASNAssociatedWithThePeering();
}

main().catch(console.error);
