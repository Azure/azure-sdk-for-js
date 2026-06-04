// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AutomationClient } = require("@azure/arm-automation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete the connection.
 *
 * @summary delete the connection.
 * x-ms-original-file: 2024-10-23/deleteConnection.json
 */
async function deleteAnExistingConnection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
  const client = new AutomationClient(credential, subscriptionId);
  await client.connection.delete("rg", "myAutomationAccount28", "myConnection");
}

async function main() {
  await deleteAnExistingConnection();
}

main().catch(console.error);
