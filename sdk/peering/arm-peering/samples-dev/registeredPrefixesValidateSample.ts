// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PeeringManagementClient } from "@azure/arm-peering";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to validates an existing registered prefix with the specified name under the given subscription, resource group and peering.
 *
 * @summary validates an existing registered prefix with the specified name under the given subscription, resource group and peering.
 * x-ms-original-file: 2025-05-01/ValidateRegisteredPrefix.json
 */
async function validateARegisteredPrefixAssociatedWithThePeering(): Promise<void> {
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

async function main(): Promise<void> {
  await validateARegisteredPrefixAssociatedWithThePeering();
}

main().catch(console.error);
