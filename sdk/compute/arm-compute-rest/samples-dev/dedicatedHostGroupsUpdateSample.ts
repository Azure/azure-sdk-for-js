// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Update an dedicated host group.
 *
 * @summary Update an dedicated host group.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/dedicatedHostExamples/DedicatedHostGroups_Update_MaximumSet_Gen.json
 */

import type { DedicatedHostGroupsUpdateParameters } from "@azure-rest/arm-compute";
import createComputeManagementClient from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function dedicatedHostGroupsUpdateMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rgcompute";
  const hostGroupName = "aaaa";
  const options: DedicatedHostGroupsUpdateParameters = {
    body: {
      properties: {
        platformFaultDomainCount: 3,
        supportAutomaticPlacement: true,
      },
      tags: { key9921: "aaaaaaaaaa" },
      zones: ["aaaaaaaaaaaaaaaaaaaaaaaaaaaaa"],
    },
    queryParameters: { "api-version": "2022-08-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/hostGroups/{hostGroupName}",
      subscriptionId,
      resourceGroupName,
      hostGroupName,
    )
    .patch(options);
  console.log(result);
}

dedicatedHostGroupsUpdateMaximumSetGen().catch(console.error);
/**
 * This sample demonstrates how to Update an dedicated host group.
 *
 * @summary Update an dedicated host group.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/dedicatedHostExamples/DedicatedHostGroups_Update_MinimumSet_Gen.json
 */
async function dedicatedHostGroupsUpdateMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rgcompute";
  const hostGroupName = "aaaaaaaaaaa";
  const options: DedicatedHostGroupsUpdateParameters = {
    body: {},
    queryParameters: { "api-version": "2022-08-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/hostGroups/{hostGroupName}",
      subscriptionId,
      resourceGroupName,
      hostGroupName,
    )
    .patch(options);
  console.log(result);
}

dedicatedHostGroupsUpdateMinimumSetGen().catch(console.error);
