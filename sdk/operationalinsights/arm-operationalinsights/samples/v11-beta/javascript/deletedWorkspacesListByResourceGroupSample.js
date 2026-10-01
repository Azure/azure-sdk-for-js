// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OperationalInsightsManagementClient } = require("@azure/arm-operationalinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets recently deleted workspaces in a resource group, available for recovery.
 *
 * @summary gets recently deleted workspaces in a resource group, available for recovery.
 * x-ms-original-file: 2025-07-01/WorkspacesListByResourceGroupForDeleted.json
 */
async function workspacesGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.deletedWorkspaces.listByResourceGroup("oiautorest6685")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await workspacesGet();
}

main().catch(console.error);
