// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventHubManagementClient } = require("@azure/arm-eventhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all the Schema Groups in a Namespace.
 *
 * @summary gets all the Schema Groups in a Namespace.
 * x-ms-original-file: 2026-01-01/SchemaRegistry/SchemaRegistryListByNamespace.json
 */
async function schemaRegistryListAll() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "e8baea74-64ce-459b-bee3-5aa4c47b3ae3";
  const client = new EventHubManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.schemaRegistry.listByNamespace(
    "alitest",
    "ali-ua-test-eh-system-1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await schemaRegistryListAll();
}

main().catch(console.error);
