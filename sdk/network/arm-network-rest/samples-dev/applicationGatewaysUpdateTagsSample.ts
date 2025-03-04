// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { ApplicationGatewaysUpdateTagsParameters } from "@azure-rest/arm-network";
import createNetworkManagementClient from "@azure-rest/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Updates the specified application gateway tags.
 *
 * @summary Updates the specified application gateway tags.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2022-05-01/examples/ApplicationGatewayUpdateTags.json
 */
async function updateApplicationGatewayTags(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createNetworkManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rg1";
  const applicationGatewayName = "AppGw";
  const options: ApplicationGatewaysUpdateTagsParameters = {
    body: { tags: { tag1: "value1", tag2: "value2" } },
    queryParameters: { "api-version": "2022-05-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/applicationGateways/{applicationGatewayName}",
      subscriptionId,
      resourceGroupName,
      applicationGatewayName,
    )
    .patch(options);
  console.log(result);
}

updateApplicationGatewayTags().catch(console.error);
