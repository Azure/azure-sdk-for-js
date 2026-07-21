// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureDatabricksManagementClient } from "@azure/arm-databricks";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets an Azure Databricks Access Connector.
 *
 * @summary gets an Azure Databricks Access Connector.
 * x-ms-original-file: 2026-01-01/AccessConnectorGet.json
 */
async function getAnAzureDatabricksAccessConnector(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-1111-1111-1111-111111111111";
  const client = new AzureDatabricksManagementClient(credential, subscriptionId);
  const result = await client.accessConnectors.get("rg", "myAccessConnector");
  console.log(result);
}

async function main(): Promise<void> {
  await getAnAzureDatabricksAccessConnector();
}

main().catch(console.error);
