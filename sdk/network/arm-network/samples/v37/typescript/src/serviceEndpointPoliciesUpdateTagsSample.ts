// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates tags of a service endpoint policy.
 *
 * @summary updates tags of a service endpoint policy.
 * x-ms-original-file: 2025-05-01/ServiceEndpointPolicyUpdateTags.json
 */
async function updateServiceEndpointPolicyTags(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.serviceEndpointPolicies.updateTags(
    "rg1",
    "testServiceEndpointPolicy",
    { tags: { tag1: "value1", tag2: "value2" } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateServiceEndpointPolicyTags();
}

main().catch(console.error);
