// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PeeringManagementClient } from "@azure/arm-peering";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates a new prefix with the specified name under the given subscription, resource group and peering service.
 *
 * @summary creates a new prefix with the specified name under the given subscription, resource group and peering service.
 * x-ms-original-file: 2025-05-01/CreatePeeringServicePrefix.json
 */
async function createOrUpdateAPrefixForThePeeringService(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId";
  const client = new PeeringManagementClient(credential, subscriptionId);
  const result = await client.prefixes.createOrUpdate(
    "rgName",
    "peeringServiceName",
    "peeringServicePrefixName",
    { peeringServicePrefixKey: "00000000-0000-0000-0000-000000000000", prefix: "192.168.1.0/24" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateAPrefixForThePeeringService();
}

main().catch(console.error);
