// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OperationalInsightsManagementClient } = require("@azure/arm-operationalinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the shared keys for a workspace.
 *
 * @summary gets the shared keys for a workspace.
 * x-ms-original-file: 2025-07-01/WorkspacesGetSharedKeys.json
 */
async function sharedKeysList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  const result = await client.sharedKeys.getSharedKeys("rg1", "TestLinkWS");
  console.log(result);
}

async function main() {
  await sharedKeysList();
}

main().catch(console.error);
