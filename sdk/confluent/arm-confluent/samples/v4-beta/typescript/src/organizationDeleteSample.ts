// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConfluentManagementClient } from "@azure/arm-confluent";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete Organization resource
 *
 * @summary delete Organization resource
 * x-ms-original-file: 2024-07-01/Organization_Delete.json
 */
async function confluentDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  await client.organization.delete("myResourceGroup", "myOrganization");
}

async function main(): Promise<void> {
  await confluentDelete();
}

main().catch(console.error);
