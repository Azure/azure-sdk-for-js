// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataMigrationManagementClient } = require("@azure/arm-datamigration");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete the integration runtime node.
 *
 * @summary delete the integration runtime node.
 * x-ms-original-file: 2025-09-01-preview/DeleteIntegrationRuntimeNode.json
 */
async function deleteTheIntegrationRuntimeNode() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new DataMigrationManagementClient(credential, subscriptionId);
  const result = await client.sqlMigrationServices.deleteNode("testrg", "service1", {
    integrationRuntimeName: "IRName",
    nodeName: "nodeName",
  });
  console.log(result);
}

async function main() {
  await deleteTheIntegrationRuntimeNode();
}

main().catch(console.error);
