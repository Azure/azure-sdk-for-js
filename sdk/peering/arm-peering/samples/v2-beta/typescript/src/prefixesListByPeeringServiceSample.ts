// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PeeringManagementClient } from "@azure/arm-peering";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all prefixes under the given subscription, resource group and peering service.
 *
 * @summary lists all prefixes under the given subscription, resource group and peering service.
 * x-ms-original-file: 2025-05-01/ListPrefixesByPeeringService.json
 */
async function listAllThePrefixesAssociatedWithThePeeringService(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId";
  const client = new PeeringManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.prefixes.listByPeeringService("rgName", "peeringServiceName")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listAllThePrefixesAssociatedWithThePeeringService();
}

main().catch(console.error);
