// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationalInsightsManagementClient } from "@azure/arm-operationalinsights";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Reconcile network security perimeter configuration for Workspace resource.
 *
 * @summary Reconcile network security perimeter configuration for Workspace resource.
 * x-ms-original-file: specification/operationalinsights/resource-manager/Microsoft.OperationalInsights/OperationalInsights/stable/2025-07-01/examples/NSPForWorkspaces_Reconcile.json
 */
async function reconcileNspConfigForScheduledQueryRule(): Promise<void> {
  const subscriptionId =
    process.env["OPERATIONALINSIGHTS_SUBSCRIPTION_ID"] ||
    "00000000-1111-2222-3333-444444444444";
  const resourceGroupName =
    process.env["OPERATIONALINSIGHTS_RESOURCE_GROUP"] || "exampleRG";
  const workspaceName = "someWorkspace";
  const networkSecurityPerimeterConfigurationName =
    "somePerimeterConfiguration";
  const credential = new DefaultAzureCredential();
  const client = new OperationalInsightsManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.workspaces.beginReconcileNSPAndWait(
    resourceGroupName,
    workspaceName,
    networkSecurityPerimeterConfigurationName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await reconcileNspConfigForScheduledQueryRule();
}

main().catch(console.error);
