// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventHubManagementClient } from "@azure/arm-eventhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or Updates an EventHub schema group.
 *
 * @summary creates or Updates an EventHub schema group.
 * x-ms-original-file: 2026-01-01/SchemaRegistry/SchemaRegistryCreate.json
 */
async function schemaRegistryCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "e8baea74-64ce-459b-bee3-5aa4c47b3ae3";
  const client = new EventHubManagementClient(credential, subscriptionId);
  const result = await client.schemaRegistry.createOrUpdate(
    "alitest",
    "ali-ua-test-eh-system-1",
    "testSchemaGroup1",
    { groupProperties: {}, schemaCompatibility: "Forward", schemaType: "Avro" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await schemaRegistryCreate();
}

main().catch(console.error);
