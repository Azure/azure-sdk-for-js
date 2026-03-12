// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Updates an azure databricks accessConnector.
 *
 * @summary Updates an azure databricks accessConnector.
 * x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/stable/2023-05-01/examples/AccessConnectorPatchUpdate.json
 */

import type { AccessConnectorUpdate } from "@azure/arm-databricks";
import { AzureDatabricksManagementClient } from "@azure/arm-databricks";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function updateAnAzureDatabricksAccessConnector(): Promise<void> {
  const subscriptionId = process.env["DATABRICKS_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["DATABRICKS_RESOURCE_GROUP"] || "rg";
  const connectorName = "myAccessConnector";
  const parameters: AccessConnectorUpdate = { tags: { key1: "value1" } };
  const credential = new DefaultAzureCredential();
  const client = new AzureDatabricksManagementClient(credential, subscriptionId);
  const result = await client.accessConnectors.beginUpdateAndWait(
    resourceGroupName,
    connectorName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateAnAzureDatabricksAccessConnector();
}

main().catch(console.error);
