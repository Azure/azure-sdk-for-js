// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, {
  IpGroupsCreateOrUpdateParameters,
  getLongRunningPoller
} from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Creates or updates an ipGroups in a specified resource group.
 *
 * @summary Creates or updates an ipGroups in a specified resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/IpGroupsCreate.json
 */
async function createOrUpdateIPGroups() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const ipGroupsName = "ipGroups1";
  const options: IpGroupsCreateOrUpdateParameters = {
    body: {
      location: "West US",
      properties: {
        ipAddresses: ["13.64.39.16/32", "40.74.146.80/31", "40.74.147.32/28"]
      },
      tags: { key1: "value1" }
    },
    queryParameters: { "api-version": "2022-05-01" }
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/ipGroups/{ipGroupsName}",
      subscriptionId,
      resourceGroupName,
      ipGroupsName
    )
    .put(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createOrUpdateIPGroups().catch(console.error);
