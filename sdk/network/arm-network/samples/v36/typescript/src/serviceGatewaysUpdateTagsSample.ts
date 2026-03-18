// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TagsObject} from "@azure/arm-network";
import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Updates a service gateway tags.
 *
 * @summary Updates a service gateway tags.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/ServiceGatewayUpdateTags.json
 */
async function updateServiceGatewayTags(): Promise<void> {
  const subscriptionId =
    process.env["NETWORK_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const serviceGatewayName = "sg";
  const parameters: TagsObject = { tags: { tag1: "value1", tag2: "value2" } };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.serviceGateways.updateTags(
    resourceGroupName,
    serviceGatewayName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateServiceGatewayTags();
}

main().catch(console.error);
