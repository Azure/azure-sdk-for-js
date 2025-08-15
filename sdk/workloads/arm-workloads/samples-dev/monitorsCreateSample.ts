// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Monitor } from "@azure/arm-workloads";
import { WorkloadsClient } from "@azure/arm-workloads";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates a SAP monitor for the specified subscription, resource group, and resource name.
 *
 * @summary Creates a SAP monitor for the specified subscription, resource group, and resource name.
 * x-ms-original-file: specification/workloads/resource-manager/Microsoft.Workloads/stable/2023-04-01/examples/workloadmonitor/monitors_Create.json
 */
async function createASapMonitor(): Promise<void> {
  const subscriptionId =
    process.env["WORKLOADS_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["WORKLOADS_RESOURCE_GROUP"] || "myResourceGroup";
  const monitorName = "mySapMonitor";
  const monitorParameter: Monitor = {
    appLocation: "westus",
    location: "westus",
    logAnalyticsWorkspaceArmId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/myResourceGroup/providers/microsoft.operationalinsights/workspaces/myWorkspace",
    managedResourceGroupConfiguration: { name: "myManagedRg" },
    monitorSubnet:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.Network/virtualNetworks/myVnet/subnets/mySubnet",
    routingPreference: "RouteAll",
    tags: { key: "value" },
  };
  const credential = new DefaultAzureCredential();
  const client = new WorkloadsClient(credential, subscriptionId);
  const result = await client.monitors.beginCreateAndWait(
    resourceGroupName,
    monitorName,
    monitorParameter,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createASapMonitor();
}

main().catch(console.error);
