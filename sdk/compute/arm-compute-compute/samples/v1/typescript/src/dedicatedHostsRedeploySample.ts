// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to redeploy the dedicated host. The operation will complete successfully once the dedicated host has migrated to a new node and is running. To determine the health of VMs deployed on the dedicated host after the redeploy check the Resource Health Center in the Azure Portal. Please refer to https://docs.microsoft.com/azure/service-health/resource-health-overview for more details.
 *
 * @summary redeploy the dedicated host. The operation will complete successfully once the dedicated host has migrated to a new node and is running. To determine the health of VMs deployed on the dedicated host after the redeploy check the Resource Health Center in the Azure Portal. Please refer to https://docs.microsoft.com/azure/service-health/resource-health-overview for more details.
 * x-ms-original-file: 2025-04-01/dedicatedHostExamples/DedicatedHost_Redeploy.json
 */
async function redeployDedicatedHost(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.dedicatedHosts.redeploy("myResourceGroup", "myDedicatedHostGroup", "myHost");
}

async function main(): Promise<void> {
  await redeployDedicatedHost();
}

main().catch(console.error);
