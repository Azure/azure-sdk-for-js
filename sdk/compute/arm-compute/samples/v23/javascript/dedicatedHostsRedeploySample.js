// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Redeploy the dedicated host. The operation will complete successfully once the dedicated host has migrated to a new node and is running. To determine the health of VMs deployed on the dedicated host after the redeploy check the Resource Health Center in the Azure Portal. Please refer to https://docs.microsoft.com/azure/service-health/resource-health-overview for more details.
 *
 * @summary Redeploy the dedicated host. The operation will complete successfully once the dedicated host has migrated to a new node and is running. To determine the health of VMs deployed on the dedicated host after the redeploy check the Resource Health Center in the Azure Portal. Please refer to https://docs.microsoft.com/azure/service-health/resource-health-overview for more details.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2025-04-01/examples/dedicatedHostExamples/DedicatedHost_Redeploy.json
 */
async function redeployDedicatedHost() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const hostGroupName = "myDedicatedHostGroup";
  const hostName = "myHost";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.dedicatedHosts.beginRedeployAndWait(
    resourceGroupName,
    hostGroupName,
    hostName,
  );
  console.log(result);
}

async function main() {
  await redeployDedicatedHost();
}

main().catch(console.error);
