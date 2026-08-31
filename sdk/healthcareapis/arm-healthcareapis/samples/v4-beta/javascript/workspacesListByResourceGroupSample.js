// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HealthcareApisManagementClient } = require("@azure/arm-healthcareapis");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all the available workspaces under the specified resource group.
 *
 * @summary lists all the available workspaces under the specified resource group.
 * x-ms-original-file: 2025-04-01-preview/workspaces/Workspaces_ListByResourceGroup.json
 */
async function getWorkspacesByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HealthcareApisManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.workspaces.listByResourceGroup("testRG")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getWorkspacesByResourceGroup();
}

main().catch(console.error);
