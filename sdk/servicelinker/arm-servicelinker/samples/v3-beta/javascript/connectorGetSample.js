// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceLinkerManagementClient } = require("@azure/arm-servicelinker");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns Connector resource for a given name.
 *
 * @summary returns Connector resource for a given name.
 * x-ms-original-file: 2024-07-01-preview/Connectors.json
 */
async function connector() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceLinkerManagementClient(credential, subscriptionId);
  const result = await client.connector.get("test-rg", "westus", "connectorName");
  console.log(result);
}

async function main() {
  await connector();
}

main().catch(console.error);
