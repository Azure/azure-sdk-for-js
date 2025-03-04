// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { IpAllocationsDeleteParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient, { getLongRunningPoller } from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Deletes the specified IpAllocation.
 *
 * @summary Deletes the specified IpAllocation.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/IpAllocationDelete.json
 */
async function deleteIPAllocation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const ipAllocationName = "test-ipallocation";
  const options: IpAllocationsDeleteParameters = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/IpAllocations/{ipAllocationName}",
      subscriptionId,
      resourceGroupName,
      ipAllocationName,
    )
    .delete(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

deleteIPAllocation().catch(console.error);
