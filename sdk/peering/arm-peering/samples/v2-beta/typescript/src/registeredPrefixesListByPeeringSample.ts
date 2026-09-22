// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PeeringManagementClient } from "@azure/arm-peering";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all registered prefixes under the given subscription, resource group and peering.
 *
 * @summary lists all registered prefixes under the given subscription, resource group and peering.
 * x-ms-original-file: 2025-05-01/ListRegisteredPrefixesByPeering.json
 */
async function listAllTheRegisteredPrefixesAssociatedWithThePeering(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId";
  const client = new PeeringManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.registeredPrefixes.listByPeering("rgName", "peeringName")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listAllTheRegisteredPrefixesAssociatedWithThePeering();
}

main().catch(console.error);
