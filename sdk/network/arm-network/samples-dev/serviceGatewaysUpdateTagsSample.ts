// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates a service gateway tags.
 *
 * @summary updates a service gateway tags.
 * x-ms-original-file: 2025-05-01/ServiceGatewayUpdateTags.json
 */
async function updateServiceGatewayTags(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.serviceGateways.updateTags("rg1", "sg", {
    tags: { tag1: "value1", tag2: "value2" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateServiceGatewayTags();
}

main().catch(console.error);
