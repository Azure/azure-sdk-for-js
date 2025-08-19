// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Delete a dedicated host.
 *
 * @summary Delete a dedicated host.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2024-11-01/examples/dedicatedHostExamples/DedicatedHost_Delete_MaximumSet_Gen.json
 */

import { ComputeManagementClient } from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function dedicatedHostDeleteMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName =
    process.env["COMPUTE_RESOURCE_GROUP"] || "rgcompute";
  const hostGroupName = "aaaaaa";
  const hostName = "aaaaaaaaaaaaaaa";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.dedicatedHosts.beginDeleteAndWait(
    resourceGroupName,
    hostGroupName,
    hostName,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Delete a dedicated host.
 *
 * @summary Delete a dedicated host.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2024-11-01/examples/dedicatedHostExamples/DedicatedHost_Delete_MinimumSet_Gen.json
 */
async function dedicatedHostDeleteMinimumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName =
    process.env["COMPUTE_RESOURCE_GROUP"] || "rgcompute";
  const hostGroupName = "aaaaaaaaaaaaaaa";
  const hostName = "aaaaa";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.dedicatedHosts.beginDeleteAndWait(
    resourceGroupName,
    hostGroupName,
    hostName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await dedicatedHostDeleteMaximumSetGen();
  await dedicatedHostDeleteMinimumSetGen();
}

main().catch(console.error);
