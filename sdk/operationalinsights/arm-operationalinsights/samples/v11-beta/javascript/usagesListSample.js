// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OperationalInsightsManagementClient } = require("@azure/arm-operationalinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a list of usage metrics for a workspace.
 *
 * @summary gets a list of usage metrics for a workspace.
 * x-ms-original-file: 2025-07-01/WorkspacesListUsages.json
 */
async function usagesList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.usages.list("rg1", "TestLinkWS")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await usagesList();
}

main().catch(console.error);
