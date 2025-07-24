// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConfluentManagementClient } = require("@azure/arm-confluent");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete confluent connector by name
 *
 * @summary delete confluent connector by name
 * x-ms-original-file: 2024-07-01/Organization_DeleteConnectorByName.json
 */
async function connectorDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  await client.connector.delete(
    "myResourceGroup",
    "myOrganization",
    "env-12132",
    "dlz-f3a90de",
    "connector-1",
  );
}

async function main() {
  await connectorDelete();
}

main().catch(console.error);
