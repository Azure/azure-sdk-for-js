// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AccessConnector } from "@azure/arm-databricks";
import { AzureDatabricksManagementClient } from "@azure/arm-databricks";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates or updates azure databricks accessConnector.
 *
 * @summary Creates or updates azure databricks accessConnector.
 * x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/stable/2023-05-01/examples/AccessConnectorCreateOrUpdate.json
 */
async function createAnAzureDatabricksAccessConnectorWithSystemAssignedIdentity(): Promise<void> {
  const subscriptionId = process.env["DATABRICKS_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["DATABRICKS_RESOURCE_GROUP"] || "rg";
  const connectorName = "myAccessConnector";
  const parameters: AccessConnector = { location: "westus" };
  const credential = new DefaultAzureCredential();
  const client = new AzureDatabricksManagementClient(credential, subscriptionId);
  const result = await client.accessConnectors.beginCreateOrUpdateAndWait(
    resourceGroupName,
    connectorName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Creates or updates azure databricks accessConnector.
 *
 * @summary Creates or updates azure databricks accessConnector.
 * x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/stable/2023-05-01/examples/AccessConnectorCreateOrUpdateWithUserAssigned.json
 */
async function createAnAzureDatabricksAccessConnectorWithUserAssignedIdentity(): Promise<void> {
  const subscriptionId = process.env["DATABRICKS_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["DATABRICKS_RESOURCE_GROUP"] || "rg";
  const connectorName = "myAccessConnector";
  const parameters: AccessConnector = { location: "westus" };
  const credential = new DefaultAzureCredential();
  const client = new AzureDatabricksManagementClient(credential, subscriptionId);
  const result = await client.accessConnectors.beginCreateOrUpdateAndWait(
    resourceGroupName,
    connectorName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createAnAzureDatabricksAccessConnectorWithSystemAssignedIdentity();
  await createAnAzureDatabricksAccessConnectorWithUserAssignedIdentity();
}

main().catch(console.error);
