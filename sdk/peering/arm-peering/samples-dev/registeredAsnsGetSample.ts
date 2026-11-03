// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PeeringManagementClient } from "@azure/arm-peering";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets an existing registered ASN with the specified name under the given subscription, resource group and peering.
 *
 * @summary gets an existing registered ASN with the specified name under the given subscription, resource group and peering.
 * x-ms-original-file: 2025-05-01/GetRegisteredAsn.json
 */
async function getARegisteredASNAssociatedWithThePeering(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId";
  const client = new PeeringManagementClient(credential, subscriptionId);
  const result = await client.registeredAsns.get("rgName", "peeringName", "registeredAsnName0");
  console.log(result);
}

async function main(): Promise<void> {
  await getARegisteredASNAssociatedWithThePeering();
}

main().catch(console.error);
