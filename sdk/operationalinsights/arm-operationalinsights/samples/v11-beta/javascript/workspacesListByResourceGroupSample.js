// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OperationalInsightsManagementClient } = require("@azure/arm-operationalinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets workspaces in a resource group.
 *
 * @summary gets workspaces in a resource group.
 * x-ms-original-file: 2025-07-01/WorkspacesListByResourceGroup.json
 */
async function workspacesGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.workspaces.listByResourceGroup("oiautorest6685")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await workspacesGet();
}

main().catch(console.error);
