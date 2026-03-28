// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PeeringManagementClient } = require("@azure/arm-peering");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to validates an existing registered prefix with the specified name under the given subscription, resource group and peering.
 *
 * @summary validates an existing registered prefix with the specified name under the given subscription, resource group and peering.
 * x-ms-original-file: 2025-05-01/ValidateRegisteredPrefix.json
 */
async function validateARegisteredPrefixAssociatedWithThePeering() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId";
  const client = new PeeringManagementClient(credential, subscriptionId);
  const result = await client.registeredPrefixes.validate(
    "rgName",
    "peeringName",
    "registeredPrefixName",
  );
  console.log(result);
}

async function main() {
  await validateARegisteredPrefixAssociatedWithThePeering();
}

main().catch(console.error);
