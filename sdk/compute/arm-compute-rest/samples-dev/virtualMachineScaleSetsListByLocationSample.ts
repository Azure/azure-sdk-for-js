// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets all the VM scale sets under the specified subscription for the specified location.
 *
 * @summary Gets all the VM scale sets under the specified subscription for the specified location.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineScaleSetExamples/VirtualMachineScaleSets_ListBySubscription_ByLocation.json
 */

import type { VirtualMachineScaleSetsListByLocationParameters } from "@azure-rest/arm-compute";
import createComputeManagementClient, { paginate } from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listsAllTheVMScaleSetsUnderTheSpecifiedSubscriptionForTheSpecifiedLocation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const location = "eastus";
  const options: VirtualMachineScaleSetsListByLocationParameters = {
    queryParameters: { "api-version": "2022-08-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/locations/{location}/virtualMachineScaleSets",
      subscriptionId,
      location,
    )
    .get(options);
  const pageData = paginate(client, initialResponse);
  const result = [];
  for await (const item of pageData) {
    result.push(item);
  }
  console.log(result);
}

listsAllTheVMScaleSetsUnderTheSpecifiedSubscriptionForTheSpecifiedLocation().catch(console.error);
