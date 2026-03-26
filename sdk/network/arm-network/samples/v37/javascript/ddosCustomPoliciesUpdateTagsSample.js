// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a DDoS custom policy tags.
 *
 * @summary update a DDoS custom policy tags.
 * x-ms-original-file: 2025-05-01/DdosCustomPolicyUpdateTags.json
 */
async function dDoSCustomPolicyUpdateTags() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.ddosCustomPolicies.updateTags("rg1", "test-ddos-custom-policy", {
    tags: { tag1: "value1", tag2: "value2" },
  });
  console.log(result);
}

async function main() {
  await dDoSCustomPolicyUpdateTags();
}

main().catch(console.error);
