// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OperationalInsightsManagementClient } = require("@azure/arm-operationalinsights");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets the available service tiers for the workspace.
 *
 * @summary Gets the available service tiers for the workspace.
 * x-ms-original-file: specification/operationalinsights/resource-manager/Microsoft.OperationalInsights/OperationalInsights/stable/2025-07-01/examples/WorkspacesAvailableServiceTiers.json
 */
async function availableServiceTiers() {
  const subscriptionId =
    process.env["OPERATIONALINSIGHTS_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-00000000000";
  const resourceGroupName = process.env["OPERATIONALINSIGHTS_RESOURCE_GROUP"] || "rg1";
  const workspaceName = "workspace1";
  const credential = new DefaultAzureCredential();
  const client = new OperationalInsightsManagementClient(credential, subscriptionId);
  const result = await client.availableServiceTiers.listByWorkspace(
    resourceGroupName,
    workspaceName,
  );
  console.log(result);
}

async function main() {
  await availableServiceTiers();
}

main().catch(console.error);
