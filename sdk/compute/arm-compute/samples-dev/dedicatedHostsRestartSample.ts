// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Restart the dedicated host. The operation will complete successfully once the dedicated host has restarted and is running. To determine the health of VMs deployed on the dedicated host after the restart check the Resource Health Center in the Azure Portal. Please refer to https://docs.microsoft.com/azure/service-health/resource-health-overview for more details.
 *
 * @summary Restart the dedicated host. The operation will complete successfully once the dedicated host has restarted and is running. To determine the health of VMs deployed on the dedicated host after the restart check the Resource Health Center in the Azure Portal. Please refer to https://docs.microsoft.com/azure/service-health/resource-health-overview for more details.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2024-11-01/examples/dedicatedHostExamples/DedicatedHost_Restart.json
 */

import { ComputeManagementClient } from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function restartDedicatedHost(): Promise<void> {
  const subscriptionId =
    process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName =
    process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const hostGroupName = "myDedicatedHostGroup";
  const hostName = "myHost";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.dedicatedHosts.beginRestartAndWait(
    resourceGroupName,
    hostGroupName,
    hostName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await restartDedicatedHost();
}

main().catch(console.error);
