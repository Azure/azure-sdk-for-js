// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureDatabricksManagementClient } from "@azure/arm-databricks";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to List private endpoint connections of the workspace
 *
 * @summary List private endpoint connections of the workspace
 * x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/stable/2023-02-01/examples/ListPrivateEndpointConnections.json
 */
async function listPrivateEndpointConnections(): Promise<void> {
  const subscriptionId =
    process.env["DATABRICKS_SUBSCRIPTION_ID"] || "11111111-1111-1111-1111-111111111111";
  const resourceGroupName = process.env["DATABRICKS_RESOURCE_GROUP"] || "myResourceGroup";
  const workspaceName = "myWorkspace";
  const credential = new DefaultAzureCredential();
  const client = new AzureDatabricksManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateEndpointConnections.list(
    resourceGroupName,
    workspaceName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listPrivateEndpointConnections();
}

main().catch(console.error);
