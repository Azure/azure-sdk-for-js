// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  DeleteNode,
  DataMigrationManagementClient,
} from "@azure/arm-datamigration";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Delete the integration runtime node.
 *
 * @summary Delete the integration runtime node.
 * x-ms-original-file: specification/datamigration/resource-manager/Microsoft.DataMigration/stable/2025-06-30/examples/DeleteIntegrationRuntimeNode.json
 */
async function deleteTheIntegrationRuntimeNode(): Promise<void> {
  const subscriptionId =
    process.env["DATAMIGRATION_SUBSCRIPTION_ID"] ||
    "00000000-1111-2222-3333-444444444444";
  const resourceGroupName =
    process.env["DATAMIGRATION_RESOURCE_GROUP"] || "testrg";
  const sqlMigrationServiceName = "service1";
  const parameters: DeleteNode = {
    integrationRuntimeName: "IRName",
    nodeName: "nodeName",
  };
  const credential = new DefaultAzureCredential();
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.sqlMigrationServices.deleteNode(
    resourceGroupName,
    sqlMigrationServiceName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteTheIntegrationRuntimeNode();
}

main().catch(console.error);
