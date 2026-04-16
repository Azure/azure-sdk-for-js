// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OperationalInsightsManagementClient } = require("@azure/arm-operationalinsights");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Activates failover for the specified workspace.




The specified replication location must match the location of the enabled replication for this workspace. The failover operation is asynchronous and can take up to 30 minutes to complete. The status of the operation can be checked using the operationId returned in the response.
 *
 * @summary Activates failover for the specified workspace.




The specified replication location must match the location of the enabled replication for this workspace. The failover operation is asynchronous and can take up to 30 minutes to complete. The status of the operation can be checked using the operationId returned in the response.
 * x-ms-original-file: specification/operationalinsights/resource-manager/Microsoft.OperationalInsights/OperationalInsights/stable/2025-07-01/examples/WorkspacesFailover.json
 */
async function workspacesFailover() {
  const subscriptionId =
    process.env["OPERATIONALINSIGHTS_SUBSCRIPTION_ID"] || "53bc36c5-91e1-4d09-92c9-63b89e571926";
  const resourceGroupName = process.env["OPERATIONALINSIGHTS_RESOURCE_GROUP"] || "oiautorest6685";
  const location = "eastus";
  const workspaceName = "oiautorest6685";
  const credential = new DefaultAzureCredential();
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  const result = await client.workspaces.beginFailoverAndWait(
    resourceGroupName,
    location,
    workspaceName,
  );
  console.log(result);
}

async function main() {
  await workspacesFailover();
}

main().catch(console.error);
