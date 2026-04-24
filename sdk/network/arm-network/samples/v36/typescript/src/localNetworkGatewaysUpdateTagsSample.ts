// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TagsObject} from "@azure/arm-network";
import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Updates a local network gateway tags.
 *
 * @summary Updates a local network gateway tags.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/LocalNetworkGatewayUpdateTags.json
 */
async function updateLocalNetworkGatewayTags(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const localNetworkGatewayName = "lgw";
  const parameters: TagsObject = { tags: { tag1: "value1", tag2: "value2" } };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.localNetworkGateways.updateTags(
    resourceGroupName,
    localNetworkGatewayName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateLocalNetworkGatewayTags();
}

main().catch(console.error);
