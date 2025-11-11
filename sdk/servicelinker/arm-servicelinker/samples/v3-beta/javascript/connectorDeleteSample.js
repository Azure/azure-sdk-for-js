// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceLinkerManagementClient } = require("@azure/arm-servicelinker");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a Connector.
 *
 * @summary delete a Connector.
 * x-ms-original-file: 2024-07-01-preview/DeleteConnector.json
 */
async function deleteConnector() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceLinkerManagementClient(credential, subscriptionId);
  await client.connector.delete("test-rg", "westus", "connectorName");
}

async function main() {
  await deleteConnector();
}

main().catch(console.error);
