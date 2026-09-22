// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureDatabricksManagementClient } = require("@azure/arm-databricks");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates an Azure Databricks Access Connector.
 *
 * @summary updates an Azure Databricks Access Connector.
 * x-ms-original-file: 2026-01-01/AccessConnectorPatchUpdate.json
 */
async function updateAnAzureDatabricksAccessConnector() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new AzureDatabricksManagementClient(credential, subscriptionId);
  const result = await client.accessConnectors.update("rg", "myAccessConnector", {
    tags: { key1: "value1" },
  });
  console.log(result);
}

async function main() {
  await updateAnAzureDatabricksAccessConnector();
}

main().catch(console.error);
