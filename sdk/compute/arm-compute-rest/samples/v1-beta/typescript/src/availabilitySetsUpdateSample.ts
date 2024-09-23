// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createComputeManagementClient, {
  AvailabilitySetsUpdateParameters
} from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Update an availability set.
 *
 * @summary Update an availability set.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/availabilitySetExamples/AvailabilitySets_Update_MaximumSet_Gen.json
 */
async function availabilitySetsUpdateMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rgcompute";
  const availabilitySetName = "aaaaaaaaaaaaaaaaaaa";
  const options: AvailabilitySetsUpdateParameters = {
    body: {
      properties: {
        platformFaultDomainCount: 2,
        platformUpdateDomainCount: 20,
        proximityPlacementGroup: {
          id:
            "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/availabilitySets/{availabilitySetName}"
        },
        virtualMachines: [
          {
            id:
              "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/availabilitySets/{availabilitySetName}"
          }
        ]
      },
      sku: { name: "DSv3-Type1", capacity: 7, tier: "aaa" },
      tags: { key2574: "aaaaaaaa" }
    },
    queryParameters: { "api-version": "2022-08-01" }
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/availabilitySets/{availabilitySetName}",
      subscriptionId,
      resourceGroupName,
      availabilitySetName
    )
    .patch(options);
  console.log(result);
}

availabilitySetsUpdateMaximumSetGen().catch(console.error);
/**
 * This sample demonstrates how to Update an availability set.
 *
 * @summary Update an availability set.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/availabilitySetExamples/AvailabilitySets_Update_MinimumSet_Gen.json
 */
async function availabilitySetsUpdateMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rgcompute";
  const availabilitySetName = "aaaaaaaaaaaaaaaaaaaa";
  const options: AvailabilitySetsUpdateParameters = {
    body: {},
    queryParameters: { "api-version": "2022-08-01" }
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/availabilitySets/{availabilitySetName}",
      subscriptionId,
      resourceGroupName,
      availabilitySetName
    )
    .patch(options);
  console.log(result);
}

availabilitySetsUpdateMinimumSetGen().catch(console.error);
