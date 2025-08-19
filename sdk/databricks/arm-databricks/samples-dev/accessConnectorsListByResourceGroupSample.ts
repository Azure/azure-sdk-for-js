// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureDatabricksManagementClient } from "@azure/arm-databricks";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets all the azure databricks accessConnectors within a resource group.
 *
 * @summary Gets all the azure databricks accessConnectors within a resource group.
 * x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/stable/2023-05-01/examples/AccessConnectorsListByResourceGroup.json
 */
async function listsAzureDatabricksAccessConnectorsWithinAResourceGroup(): Promise<void> {
  const subscriptionId = process.env["DATABRICKS_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["DATABRICKS_RESOURCE_GROUP"] || "rg";
  const credential = new DefaultAzureCredential();
  const client = new AzureDatabricksManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.accessConnectors.listByResourceGroup(resourceGroupName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listsAzureDatabricksAccessConnectorsWithinAResourceGroup();
}

main().catch(console.error);
