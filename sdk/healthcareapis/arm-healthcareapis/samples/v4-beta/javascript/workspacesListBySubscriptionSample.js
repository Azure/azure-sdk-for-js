// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HealthcareApisManagementClient } = require("@azure/arm-healthcareapis");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all the available workspaces under the specified subscription.
 *
 * @summary lists all the available workspaces under the specified subscription.
 * x-ms-original-file: 2025-04-01-preview/workspaces/Workspaces_ListBySubscription.json
 */
async function getWorkspacesBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new HealthcareApisManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.workspaces.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getWorkspacesBySubscription();
}

main().catch(console.error);
