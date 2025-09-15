// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Delete a dedicated host group.
 *
 * @summary Delete a dedicated host group.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2024-11-01/examples/dedicatedHostExamples/DedicatedHostGroup_Delete_MaximumSet_Gen.json
 */

import { ComputeManagementClient } from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function dedicatedHostGroupDeleteMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName =
    process.env["COMPUTE_RESOURCE_GROUP"] || "rgcompute";
  const hostGroupName = "a";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.dedicatedHostGroups.delete(
    resourceGroupName,
    hostGroupName,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Delete a dedicated host group.
 *
 * @summary Delete a dedicated host group.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2024-11-01/examples/dedicatedHostExamples/DedicatedHostGroup_Delete_MinimumSet_Gen.json
 */
async function dedicatedHostGroupDeleteMinimumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName =
    process.env["COMPUTE_RESOURCE_GROUP"] || "rgcompute";
  const hostGroupName = "aaaa";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.dedicatedHostGroups.delete(
    resourceGroupName,
    hostGroupName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await dedicatedHostGroupDeleteMaximumSetGen();
  await dedicatedHostGroupDeleteMinimumSetGen();
}

main().catch(console.error);
