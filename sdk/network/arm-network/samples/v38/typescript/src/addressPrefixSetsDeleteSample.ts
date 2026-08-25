// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified address prefix set.
 *
 * @summary deletes the specified address prefix set.
 * x-ms-original-file: 2025-09-01/AddressPrefixSetDelete.json
 */
async function deleteAddressPrefixSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.addressPrefixSets.delete("rg1", "test-asg", "test-prefix-set");
}

async function main(): Promise<void> {
  await deleteAddressPrefixSet();
}

main().catch(console.error);
