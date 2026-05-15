// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified subnet.
 *
 * @summary deletes the specified subnet.
 * x-ms-original-file: 2025-05-01/SubnetDelete.json
 */
async function deleteSubnet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.subnets.delete("subnet-test", "vnetname", "subnet1");
}

async function main(): Promise<void> {
  await deleteSubnet();
}

main().catch(console.error);
