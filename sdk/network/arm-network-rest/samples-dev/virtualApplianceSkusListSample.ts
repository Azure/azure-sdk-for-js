// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { VirtualApplianceSkusListParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient, { paginate } from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to List all SKUs available for a virtual appliance.
 *
 * @summary List all SKUs available for a virtual appliance.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/NetworkVirtualApplianceSkuList.json
 */
async function networkVirtualApplianceSkuListResult() {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const options: VirtualApplianceSkusListParameters = {
    queryParameters: { "api-version": "2022-05-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.Network/networkVirtualApplianceSkus",
      subscriptionId,
    )
    .get(options);
  const pageData = paginate(client, initialResponse);
  const result = [];
  for await (const item of pageData) {
    result.push(item);
  }
  console.log(result);
}

networkVirtualApplianceSkuListResult().catch(console.error);
