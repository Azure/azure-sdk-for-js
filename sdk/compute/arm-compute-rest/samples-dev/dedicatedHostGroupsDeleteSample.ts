// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DedicatedHostGroupsDeleteParameters } from "@azure-rest/arm-compute";
import createComputeManagementClient from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Delete a dedicated host group.
 *
 * @summary Delete a dedicated host group.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/dedicatedHostExamples/DedicatedHostGroups_Delete_MaximumSet_Gen.json
 */
async function dedicatedHostGroupsDeleteMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rgcompute";
  const hostGroupName = "a";
  const options: DedicatedHostGroupsDeleteParameters = {
    queryParameters: { "api-version": "2022-08-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/hostGroups/{hostGroupName}",
      subscriptionId,
      resourceGroupName,
      hostGroupName,
    )
    .delete(options);
  console.log(result);
}

dedicatedHostGroupsDeleteMaximumSetGen().catch(console.error);
/**
 * This sample demonstrates how to Delete a dedicated host group.
 *
 * @summary Delete a dedicated host group.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/dedicatedHostExamples/DedicatedHostGroups_Delete_MinimumSet_Gen.json
 */
async function dedicatedHostGroupsDeleteMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rgcompute";
  const hostGroupName = "aaaa";
  const options: DedicatedHostGroupsDeleteParameters = {
    queryParameters: { "api-version": "2022-08-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/hostGroups/{hostGroupName}",
      subscriptionId,
      resourceGroupName,
      hostGroupName,
    )
    .delete(options);
  console.log(result);
}

dedicatedHostGroupsDeleteMinimumSetGen().catch(console.error);
