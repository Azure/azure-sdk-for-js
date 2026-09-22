// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OperationalInsightsManagementClient } = require("@azure/arm-operationalinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update a workspace.
 *
 * @summary create or update a workspace.
 * x-ms-original-file: 2025-07-01/WorkspacesCreate.json
 */
async function workspacesCreate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  const result = await client.workspaces.createOrUpdate("oiautorest6685", "oiautorest6685", {
    location: "australiasoutheast",
    retentionInDays: 30,
    sku: { name: "PerGB2018" },
    tags: { tag1: "val1" },
  });
  console.log(result);
}

async function main() {
  await workspacesCreate();
}

main().catch(console.error);
