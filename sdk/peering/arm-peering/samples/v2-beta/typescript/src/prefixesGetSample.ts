// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PeeringManagementClient } from "@azure/arm-peering";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets an existing prefix with the specified name under the given subscription, resource group and peering service.
 *
 * @summary gets an existing prefix with the specified name under the given subscription, resource group and peering service.
 * x-ms-original-file: 2025-05-01/GetPeeringServicePrefix.json
 */
async function getAPrefixAssociatedWithThePeeringService(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId";
  const client = new PeeringManagementClient(credential, subscriptionId);
  const result = await client.prefixes.get(
    "rgName",
    "peeringServiceName",
    "peeringServicePrefixName",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAPrefixAssociatedWithThePeeringService();
}

main().catch(console.error);
