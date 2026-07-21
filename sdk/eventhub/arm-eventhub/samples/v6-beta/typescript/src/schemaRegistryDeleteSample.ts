// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventHubManagementClient } from "@azure/arm-eventhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes an EventHub schema group.
 *
 * @summary deletes an EventHub schema group.
 * x-ms-original-file: 2026-01-01/SchemaRegistry/SchemaRegistryDelete.json
 */
async function schemaRegistryDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "e8baea74-64ce-459b-bee3-5aa4c47b3ae3";
  const client = new EventHubManagementClient(credential, subscriptionId);
  await client.schemaRegistry.delete("alitest", "ali-ua-test-eh-system-1", "testSchemaGroup1");
}

async function main(): Promise<void> {
  await schemaRegistryDelete();
}

main().catch(console.error);
