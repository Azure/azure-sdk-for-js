// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get the specified private link resource for the given group id (sub-resource)
 *
 * @summary Get the specified private link resource for the given group id (sub-resource)
 * x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/stable/2023-02-01/examples/PrivateLinkResourcesGet.json
 */

import { AzureDatabricksManagementClient } from "@azure/arm-databricks";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getAPrivateLinkResource(): Promise<void> {
  const subscriptionId =
    process.env["DATABRICKS_SUBSCRIPTION_ID"] || "11111111-1111-1111-1111-111111111111";
  const resourceGroupName = process.env["DATABRICKS_RESOURCE_GROUP"] || "myResourceGroup";
  const workspaceName = "myWorkspace";
  const groupId = "databricks_ui_api";
  const credential = new DefaultAzureCredential();
  const client = new AzureDatabricksManagementClient(credential, subscriptionId);
  const result = await client.privateLinkResources.get(resourceGroupName, workspaceName, groupId);
  console.log(result);
}

async function main(): Promise<void> {
  await getAPrivateLinkResource();
}

main().catch(console.error);
