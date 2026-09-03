// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PeeringManagementClient } from "@azure/arm-peering";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes an existing registered ASN with the specified name under the given subscription, resource group and peering.
 *
 * @summary deletes an existing registered ASN with the specified name under the given subscription, resource group and peering.
 * x-ms-original-file: 2025-05-01/DeleteRegisteredAsn.json
 */
async function deletesARegisteredASNAssociatedWithThePeering(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId";
  const client = new PeeringManagementClient(credential, subscriptionId);
  await client.registeredAsns.delete("rgName", "peeringName", "registeredAsnName");
}

async function main(): Promise<void> {
  await deletesARegisteredASNAssociatedWithThePeering();
}

main().catch(console.error);
