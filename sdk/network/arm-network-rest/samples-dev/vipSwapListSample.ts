// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, { VipSwapListParameters } from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Gets the list of SwapResource which identifies the slot type for the specified cloud service. The slot type on a cloud service can either be Staging or Production
 *
 * @summary Gets the list of SwapResource which identifies the slot type for the specified cloud service. The slot type on a cloud service can either be Staging or Production
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/CloudServiceSwapList.json
 */
async function getSwapResourceList() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const groupName = "rg1";
  const resourceName = "testCloudService";
  const options: VipSwapListParameters = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{groupName}/providers/Microsoft.Compute/cloudServices/{resourceName}/providers/Microsoft.Network/cloudServiceSlots",
      subscriptionId,
      groupName,
      resourceName,
    )
    .get(options);
  console.log(result);
}

getSwapResourceList().catch(console.error);
