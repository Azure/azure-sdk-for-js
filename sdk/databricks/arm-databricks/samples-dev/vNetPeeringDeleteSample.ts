// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureDatabricksManagementClient } from "@azure/arm-databricks";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Deletes the workspace vNetPeering.
 *
 * @summary Deletes the workspace vNetPeering.
 * x-ms-original-file: specification/databricks/resource-manager/Microsoft.Databricks/stable/2023-02-01/examples/WorkspaceVirtualNetworkPeeringDelete.json
 */
async function deleteAWorkspaceVNetPeering(): Promise<void> {
  const subscriptionId = process.env["DATABRICKS_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["DATABRICKS_RESOURCE_GROUP"] || "rg";
  const workspaceName = "myWorkspace";
  const peeringName = "vNetPeering";
  const credential = new DefaultAzureCredential();
  const client = new AzureDatabricksManagementClient(credential, subscriptionId);
  const result = await client.vNetPeering.beginDeleteAndWait(
    resourceGroupName,
    workspaceName,
    peeringName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteAWorkspaceVNetPeering();
}

main().catch(console.error);
