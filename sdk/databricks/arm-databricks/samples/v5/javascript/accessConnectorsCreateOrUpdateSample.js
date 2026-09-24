// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureDatabricksManagementClient } = require("@azure/arm-databricks");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates Azure Databricks Access Connector.
 *
 * @summary creates or updates Azure Databricks Access Connector.
 * x-ms-original-file: 2026-01-01/AccessConnectorCreateOrUpdate.json
 */
async function createAnAzureDatabricksAccessConnectorWithSystemAssignedIdentity() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new AzureDatabricksManagementClient(credential, subscriptionId);
  const result = await client.accessConnectors.createOrUpdate("rg", "myAccessConnector", {
    location: "westus",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates Azure Databricks Access Connector.
 *
 * @summary creates or updates Azure Databricks Access Connector.
 * x-ms-original-file: 2026-01-01/AccessConnectorCreateOrUpdateWithUserAssigned.json
 */
async function createAnAzureDatabricksAccessConnectorWithUserAssignedIdentity() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new AzureDatabricksManagementClient(credential, subscriptionId);
  const result = await client.accessConnectors.createOrUpdate("rg", "myAccessConnector", {
    location: "westus",
  });
  console.log(result);
}

async function main() {
  await createAnAzureDatabricksAccessConnectorWithSystemAssignedIdentity();
  await createAnAzureDatabricksAccessConnectorWithUserAssignedIdentity();
}

main().catch(console.error);
