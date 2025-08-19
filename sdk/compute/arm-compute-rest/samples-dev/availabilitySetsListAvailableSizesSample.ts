// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists all available virtual machine sizes that can be used to create a new virtual machine in an existing availability set.
 *
 * @summary Lists all available virtual machine sizes that can be used to create a new virtual machine in an existing availability set.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/availabilitySetExamples/AvailabilitySets_ListAvailableSizes_MaximumSet_Gen.json
 */

import type { AvailabilitySetsListAvailableSizesParameters } from "@azure-rest/arm-compute";
import createComputeManagementClient, { paginate } from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function availabilitySetsListAvailableSizesMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rgcompute";
  const availabilitySetName = "aaaaaaaaaaaaaaaaaaaa";
  const options: AvailabilitySetsListAvailableSizesParameters = {
    queryParameters: { "api-version": "2022-08-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/availabilitySets/{availabilitySetName}/vmSizes",
      subscriptionId,
      resourceGroupName,
      availabilitySetName,
    )
    .get(options);
  const pageData = paginate(client, initialResponse);
  const result = [];
  for await (const item of pageData) {
    result.push(item);
  }
  console.log(result);
}

availabilitySetsListAvailableSizesMaximumSetGen().catch(console.error);
/**
 * This sample demonstrates how to Lists all available virtual machine sizes that can be used to create a new virtual machine in an existing availability set.
 *
 * @summary Lists all available virtual machine sizes that can be used to create a new virtual machine in an existing availability set.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/availabilitySetExamples/AvailabilitySets_ListAvailableSizes_MinimumSet_Gen.json
 */
async function availabilitySetsListAvailableSizesMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rgcompute";
  const availabilitySetName = "aa";
  const options: AvailabilitySetsListAvailableSizesParameters = {
    queryParameters: { "api-version": "2022-08-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/availabilitySets/{availabilitySetName}/vmSizes",
      subscriptionId,
      resourceGroupName,
      availabilitySetName,
    )
    .get(options);
  const pageData = paginate(client, initialResponse);
  const result = [];
  for await (const item of pageData) {
    result.push(item);
  }
  console.log(result);
}

availabilitySetsListAvailableSizesMinimumSetGen().catch(console.error);
