// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const createComputeManagementClient = require("@azure-rest/arm-compute").default;
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Update an dedicated host group.
 *
 * @summary Update an dedicated host group.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/dedicatedHostExamples/DedicatedHostGroups_Update_MaximumSet_Gen.json
 */
async function dedicatedHostGroupsUpdateMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rgcompute";
  const hostGroupName = "aaaa";
  const options = {
    body: {
      properties: {
        instanceView: {
          hosts: [
            {
              availableCapacity: {
                allocatableVMs: [{ count: 26, vmSize: "aaaaaaaaaaaaaaaaaaaa" }],
              },
              statuses: [
                {
                  code: "aaaaaaaaaaaaaaaaaaaaaaa",
                  displayStatus: "aaaaaa",
                  level: "Info",
                  message: "a",
                  time: new Date("2021-11-30T12:58:26.522Z"),
                },
              ],
            },
          ],
        },
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
      hostGroupName
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
async function dedicatedHostGroupsUpdateMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rgcompute";
  const hostGroupName = "aaaaaaaaaaa";
  const options = {
    body: {},
    queryParameters: { "api-version": "2022-08-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/hostGroups/{hostGroupName}",
      subscriptionId,
      resourceGroupName,
      hostGroupName
    )
    .patch(options);
  console.log(result);
}

dedicatedHostGroupsUpdateMinimumSetGen().catch(console.error);
