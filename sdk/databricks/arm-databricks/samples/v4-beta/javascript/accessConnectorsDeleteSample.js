// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureDatabricksManagementClient } = require("@azure/arm-databricks");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the Azure Databricks Access Connector.
 *
 * @summary deletes the Azure Databricks Access Connector.
 * x-ms-original-file: 2026-01-01/AccessConnectorDelete.json
 */
async function deleteAnAzureDatabricksAccessConnector() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new AzureDatabricksManagementClient(credential, subscriptionId);
  await client.accessConnectors.delete("rg", "myAccessConnector");
}

async function main() {
  await deleteAnAzureDatabricksAccessConnector();
}

main().catch(console.error);
