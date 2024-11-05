// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createComputeManagementClient, {
  ProximityPlacementGroupsCreateOrUpdateParameters
} from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Create or update a proximity placement group.
 *
 * @summary Create or update a proximity placement group.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/proximityPlacementGroupExamples/ProximityPlacementGroup_CreateOrUpdate.json
 */
async function createOrUpdateAProximityPlacementGroup() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const proximityPlacementGroupName = "myProximityPlacementGroup";
  const options: ProximityPlacementGroupsCreateOrUpdateParameters = {
    body: {
      location: "westus",
      properties: {
        intent: { vmSizes: ["Basic_A0", "Basic_A2"] },
        proximityPlacementGroupType: "Standard"
      },
      zones: ["1"]
    },
    queryParameters: { "api-version": "2022-08-01" }
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/proximityPlacementGroups/{proximityPlacementGroupName}",
      subscriptionId,
      resourceGroupName,
      proximityPlacementGroupName
    )
    .put(options);
  console.log(result);
}

createOrUpdateAProximityPlacementGroup().catch(console.error);
