// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Performs vip swap operation on swappable cloud services.
 *
 * @summary Performs vip swap operation on swappable cloud services.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/CloudServiceSwapPut.json
 */

import type { VipSwapCreateParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient, { getLongRunningPoller } from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function putVipSwapOperation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const groupName = "rg1";
  const resourceName = "testCloudService";
  const singletonResource = "swap";
  const options: VipSwapCreateParameters = {
    body: { properties: { slotType: "Production" } },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{groupName}/providers/Microsoft.Compute/cloudServices/{resourceName}/providers/Microsoft.Network/cloudServiceSlots/{singletonResource}",
      subscriptionId,
      groupName,
      resourceName,
      singletonResource,
    )
    .put(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

putVipSwapOperation().catch(console.error);
