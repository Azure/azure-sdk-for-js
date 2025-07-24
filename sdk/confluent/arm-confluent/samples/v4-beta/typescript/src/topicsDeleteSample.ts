// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConfluentManagementClient } from "@azure/arm-confluent";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete confluent topic by name
 *
 * @summary delete confluent topic by name
 * x-ms-original-file: 2024-07-01/Topics_Delete.json
 */
async function topicsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  await client.topics.delete(
    "myResourceGroup",
    "myOrganization",
    "env-12132",
    "dlz-f3a90de",
    "topic-1",
  );
}

async function main(): Promise<void> {
  await topicsDelete();
}

main().catch(console.error);
