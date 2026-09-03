// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventHubManagementClient } = require("@azure/arm-eventhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or Updates an EventHub schema group.
 *
 * @summary creates or Updates an EventHub schema group.
 * x-ms-original-file: 2026-01-01/SchemaRegistry/SchemaRegistryCreate.json
 */
async function schemaRegistryCreate() {
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

async function main() {
  await schemaRegistryCreate();
}

main().catch(console.error);
