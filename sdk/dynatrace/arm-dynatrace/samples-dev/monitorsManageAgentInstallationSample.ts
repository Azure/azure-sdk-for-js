// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ObservabilityClient } from "@azure/arm-dynatrace";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to performs Dynatrace agent install/uninstall action through the Azure Dynatrace resource on the provided list of resources.
 *
 * @summary performs Dynatrace agent install/uninstall action through the Azure Dynatrace resource on the provided list of resources.
 * x-ms-original-file: 2024-04-24/Monitors_ManageAgentInstallation_MaximumSet_Gen.json
 */
async function monitorsManageAgentInstallationMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ObservabilityClient(credential, subscriptionId);
  await client.monitors.manageAgentInstallation("myResourceGroup", "myMonitor", {
    action: "Install",
    manageAgentInstallationList: [
      {
        id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.Compute/virtualMachineScaleSets/vmssName",
      },
      {
        id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.Compute/virtualMachineScaleSets/vmssName2",
      },
    ],
  });
}

/**
 * This sample demonstrates how to performs Dynatrace agent install/uninstall action through the Azure Dynatrace resource on the provided list of resources.
 *
 * @summary performs Dynatrace agent install/uninstall action through the Azure Dynatrace resource on the provided list of resources.
 * x-ms-original-file: 2024-04-24/Monitors_ManageAgentInstallation_MinimumSet_Gen.json
 */
async function monitorsManageAgentInstallationMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ObservabilityClient(credential, subscriptionId);
  await client.monitors.manageAgentInstallation("myResourceGroup", "myMonitor", {
    action: "Uninstall",
    manageAgentInstallationList: [
      {
        id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myResourceGroup/providers/Microsoft.Compute/virtualMachineScaleSets/vmssName",
      },
    ],
  });
}

async function main(): Promise<void> {
  await monitorsManageAgentInstallationMaximumSetGen();
  await monitorsManageAgentInstallationMinimumSetGen();
}

main().catch(console.error);
