// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HealthcareApisManagementClient } = require("@azure/arm-healthcareapis");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the private link resources that need to be created for a workspace.
 *
 * @summary gets the private link resources that need to be created for a workspace.
 * x-ms-original-file: 2025-04-01-preview/privatelink/PrivateLinkResourcesListByWorkspace.json
 */
async function workspacePrivateLinkResourcesListGroupIds() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HealthcareApisManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.workspacePrivateLinkResources.listByWorkspace(
    "testRG",
    "workspace1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await workspacePrivateLinkResourcesListGroupIds();
}

main().catch(console.error);
