// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createNetworkManagementClient, {
  CustomIPPrefixesCreateOrUpdateParameters,
  getLongRunningPoller,
} from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates or updates a custom IP prefix.
 *
 * @summary Creates or updates a custom IP prefix.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/CustomIpPrefixCreateCustomizedValues.json
 */
async function createCustomIPPrefixAllocationMethod(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const customIpPrefixName = "test-customipprefix";
  const options: CustomIPPrefixesCreateOrUpdateParameters = {
    body: { location: "westus", properties: { cidr: "0.0.0.0/24" } },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/customIpPrefixes/{customIpPrefixName}",
      subscriptionId,
      resourceGroupName,
      customIpPrefixName,
    )
    .put(options);
  const poller = await getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

createCustomIPPrefixAllocationMethod().catch(console.error);
