// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConfluentManagementClient } from "@azure/arm-confluent";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete confluent environment by id
 *
 * @summary delete confluent environment by id
 * x-ms-original-file: 2024-07-01/Environment_Delete.json
 */
async function environmentDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  await client.environment.delete("myResourceGroup", "myOrganization", "env-12132");
}

async function main(): Promise<void> {
  await environmentDelete();
}

main().catch(console.error);
