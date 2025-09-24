// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the available service tiers for the workspace.
 *
 * @summary Gets the available service tiers for the workspace.
 * x-ms-original-file: specification/operationalinsights/resource-manager/Microsoft.OperationalInsights/stable/2020-08-01/examples/WorkspacesAvailableServiceTiers.json
 */

import { OperationalInsightsManagementClient } from "@azure/arm-operationalinsights";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function availableServiceTiers(): Promise<void> {
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

async function main(): Promise<void> {
  await availableServiceTiers();
}

main().catch(console.error);
