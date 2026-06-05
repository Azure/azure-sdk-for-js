// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OperationalInsightsManagementClient } = require("@azure/arm-operationalinsights");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to activates failover for the specified workspace.
 *
 * The specified replication location must match the location of the enabled replication for this workspace. The failover operation is asynchronous and can take up to 30 minutes to complete. The status of the operation can be checked using the operationId returned in the response.
 *
 * @summary activates failover for the specified workspace.
 *
 * The specified replication location must match the location of the enabled replication for this workspace. The failover operation is asynchronous and can take up to 30 minutes to complete. The status of the operation can be checked using the operationId returned in the response.
 * x-ms-original-file: 2025-07-01/WorkspacesFailover.json
 */
async function workspacesFailover() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "53bc36c5-91e1-4d09-92c9-63b89e571926";
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  await client.workspaces.failover("oiautorest6685", "eastus", "oiautorest6685");
}

async function main() {
  await workspacesFailover();
}

main().catch(console.error);
