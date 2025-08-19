// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Create or update an availability set.
 *
 * @summary Create or update an availability set.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/availabilitySetExamples/AvailabilitySet_Create.json
 */

import type { AvailabilitySetsCreateOrUpdateParameters } from "@azure-rest/arm-compute";
import createComputeManagementClient from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createAnAvailabilitySet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const availabilitySetName = "myAvailabilitySet";
  const options: AvailabilitySetsCreateOrUpdateParameters = {
    body: {
      location: "westus",
      properties: { platformFaultDomainCount: 2, platformUpdateDomainCount: 20 },
    },
    queryParameters: { "api-version": "2022-08-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/availabilitySets/{availabilitySetName}",
      subscriptionId,
      resourceGroupName,
      availabilitySetName,
    )
    .put(options);
  console.log(result);
}

createAnAvailabilitySet().catch(console.error);
