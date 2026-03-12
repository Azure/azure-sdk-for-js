// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes the azure databricks accessConnector.
 *
 * @summary Deletes the azure databricks accessConnector.
 * x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/stable/2023-05-01/examples/AccessConnectorDelete.json
 */

import { AzureDatabricksManagementClient } from "@azure/arm-databricks";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deleteAnAzureDatabricksAccessConnector(): Promise<void> {
  const subscriptionId = process.env["DATABRICKS_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["DATABRICKS_RESOURCE_GROUP"] || "rg";
  const connectorName = "myAccessConnector";
  const credential = new DefaultAzureCredential();
  const client = new AzureDatabricksManagementClient(credential, subscriptionId);
  const result = await client.accessConnectors.beginDeleteAndWait(resourceGroupName, connectorName);
  console.log(result);
}

async function main(): Promise<void> {
  await deleteAnAzureDatabricksAccessConnector();
}

main().catch(console.error);
