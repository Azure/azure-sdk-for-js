// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HanaManagementClient } = require("@azure/arm-hanaonazure");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the product Microsoft.Workloads/sapMonitors (AMS Classic) is officially retired as of May 31, 2023.
 *
 * @summary the product Microsoft.Workloads/sapMonitors (AMS Classic) is officially retired as of May 31, 2023.
 * x-ms-original-file: 2020-02-07-preview/SapMonitors_Create.json
 */
async function createASAPMonitor() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new HanaManagementClient(credential, subscriptionId);
  const result = await client.sapMonitors.create("myResourceGroup", "mySapMonitor", {
    location: "westus",
    enableCustomerAnalytics: true,
    logAnalyticsWorkspaceArmId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/myResourceGroup/providers/microsoft.operationalinsights/workspaces/myWorkspace",
    logAnalyticsWorkspaceId: "00000000-0000-0000-0000-000000000000",
    logAnalyticsWorkspaceSharedKey:
      "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000==",
    monitorSubnet:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.Network/virtualNetworks/myVnet/subnets/mySubnet",
    tags: { key: "value" },
  });
  console.log(result);
}

async function main() {
  await createASAPMonitor();
}

main().catch(console.error);
