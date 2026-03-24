// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PeeringManagementClient } = require("@azure/arm-peering");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a new registered prefix with the specified name under the given subscription, resource group and peering.
 *
 * @summary creates a new registered prefix with the specified name under the given subscription, resource group and peering.
 * x-ms-original-file: 2025-05-01/CreateRegisteredPrefix.json
 */
async function createOrUpdateARegisteredPrefixForThePeering() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId";
  const client = new PeeringManagementClient(credential, subscriptionId);
  const result = await client.registeredPrefixes.createOrUpdate(
    "rgName",
    "peeringName",
    "registeredPrefixName",
    { prefix: "10.22.20.0/24" },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateARegisteredPrefixForThePeering();
}

main().catch(console.error);
