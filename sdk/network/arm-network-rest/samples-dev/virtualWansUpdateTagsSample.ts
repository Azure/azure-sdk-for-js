// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, {
  VirtualWansUpdateTagsParameters,
} from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Updates a VirtualWAN tags.
 *
 * @summary Updates a VirtualWAN tags.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/VirtualWANUpdateTags.json
 */
async function virtualWanUpdate() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const VirtualWANName = "wan1";
  const options: VirtualWansUpdateTagsParameters = {
    body: { tags: { key1: "value1", key2: "value2" } },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/virtualWans/{VirtualWANName}",
      subscriptionId,
      resourceGroupName,
      VirtualWANName,
    )
    .patch(options);
  console.log(result);
}

virtualWanUpdate().catch(console.error);
