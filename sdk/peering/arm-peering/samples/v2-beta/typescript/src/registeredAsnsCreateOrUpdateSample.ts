// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PeeringManagementClient } from "@azure/arm-peering";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates a new registered ASN with the specified name under the given subscription, resource group and peering.
 *
 * @summary creates a new registered ASN with the specified name under the given subscription, resource group and peering.
 * x-ms-original-file: 2025-05-01/CreateRegisteredAsn.json
 */
async function createOrUpdateARegisteredASNForThePeering(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId";
  const client = new PeeringManagementClient(credential, subscriptionId);
  const result = await client.registeredAsns.createOrUpdate(
    "rgName",
    "peeringName",
    "registeredAsnName",
    { asn: 65000 },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateARegisteredASNForThePeering();
}

main().catch(console.error);
