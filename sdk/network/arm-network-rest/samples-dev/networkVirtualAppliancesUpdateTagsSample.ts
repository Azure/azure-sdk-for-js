// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, {
  NetworkVirtualAppliancesUpdateTagsParameters,
} from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Updates a Network Virtual Appliance.
 *
 * @summary Updates a Network Virtual Appliance.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/NetworkVirtualApplianceUpdateTags.json
 */
async function updateNetworkVirtualAppliance() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const networkVirtualApplianceName = "nva";
  const options: NetworkVirtualAppliancesUpdateTagsParameters = {
    body: { tags: { key1: "value1", key2: "value2" } },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/networkVirtualAppliances/{networkVirtualApplianceName}",
      subscriptionId,
      resourceGroupName,
      networkVirtualApplianceName,
    )
    .patch(options);
  console.log(result);
}

updateNetworkVirtualAppliance().catch(console.error);
