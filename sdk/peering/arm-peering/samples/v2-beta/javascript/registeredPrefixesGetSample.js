// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PeeringManagementClient } = require("@azure/arm-peering");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets an existing registered prefix with the specified name under the given subscription, resource group and peering.
 *
 * @summary gets an existing registered prefix with the specified name under the given subscription, resource group and peering.
 * x-ms-original-file: 2025-05-01/GetRegisteredPrefix.json
 */
async function getARegisteredPrefixAssociatedWithThePeering() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId";
  const client = new PeeringManagementClient(credential, subscriptionId);
  const result = await client.registeredPrefixes.get(
    "rgName",
    "peeringName",
    "registeredPrefixName",
  );
  console.log(result);
}

async function main() {
  await getARegisteredPrefixAssociatedWithThePeering();
}

main().catch(console.error);
