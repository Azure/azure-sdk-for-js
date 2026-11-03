// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventHubManagementClient } = require("@azure/arm-eventhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the details of an EventHub schema group.
 *
 * @summary gets the details of an EventHub schema group.
 * x-ms-original-file: 2026-01-01/SchemaRegistry/SchemaRegistryGet.json
 */
async function schemaRegistryGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "e8baea74-64ce-459b-bee3-5aa4c47b3ae3";
  const client = new EventHubManagementClient(credential, subscriptionId);
  const result = await client.schemaRegistry.get(
    "alitest",
    "ali-ua-test-eh-system-1",
    "testSchemaGroup1",
  );
  console.log(result);
}

async function main() {
  await schemaRegistryGet();
}

main().catch(console.error);
