// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified application security group.
 *
 * @summary deletes the specified application security group.
 * x-ms-original-file: 2025-05-01/ApplicationSecurityGroupDelete.json
 */
async function deleteApplicationSecurityGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.applicationSecurityGroups.delete("rg1", "test-asg");
}

async function main(): Promise<void> {
  await deleteApplicationSecurityGroup();
}

main().catch(console.error);
