// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const createComputeManagementClient = require("@azure-rest/arm-compute").default,
  { paginate } = require("@azure-rest/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Lists all of the dedicated host groups in the specified resource group. Use the nextLink property in the response to get the next page of dedicated host groups.
 *
 * @summary Lists all of the dedicated host groups in the specified resource group. Use the nextLink property in the response to get the next page of dedicated host groups.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/dedicatedHostExamples/DedicatedHostGroups_ListByResourceGroup_MaximumSet_Gen.json
 */
async function dedicatedHostGroupsListByResourceGroupMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rgcompute";
  const options = {
    queryParameters: { "api-version": "2022-08-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/hostGroups",
      subscriptionId,
      resourceGroupName
    )
    .get(options);
  const pageData = paginate(client, initialResponse);
  const result = [];
  for await (const item of pageData) {
    result.push(item);
  }
  console.log(result);
}

dedicatedHostGroupsListByResourceGroupMaximumSetGen().catch(console.error);
/**
 * This sample demonstrates how to Lists all of the dedicated host groups in the specified resource group. Use the nextLink property in the response to get the next page of dedicated host groups.
 *
 * @summary Lists all of the dedicated host groups in the specified resource group. Use the nextLink property in the response to get the next page of dedicated host groups.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/dedicatedHostExamples/DedicatedHostGroups_ListByResourceGroup_MinimumSet_Gen.json
 */
async function dedicatedHostGroupsListByResourceGroupMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rgcompute";
  const options = {
    queryParameters: { "api-version": "2022-08-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/hostGroups",
      subscriptionId,
      resourceGroupName
    )
    .get(options);
  const pageData = paginate(client, initialResponse);
  const result = [];
  for await (const item of pageData) {
    result.push(item);
  }
  console.log(result);
}

dedicatedHostGroupsListByResourceGroupMinimumSetGen().catch(console.error);
