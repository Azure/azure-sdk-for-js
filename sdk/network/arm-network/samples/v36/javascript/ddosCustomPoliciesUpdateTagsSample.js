// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Update a DDoS custom policy tags.
 *
 * @summary Update a DDoS custom policy tags.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/DdosCustomPolicyUpdateTags.json
 */
async function dDoSCustomPolicyUpdateTags() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const ddosCustomPolicyName = "test-ddos-custom-policy";
  const parameters = { tags: { tag1: "value1", tag2: "value2" } };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.ddosCustomPolicies.updateTags(
    resourceGroupName,
    ddosCustomPolicyName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await dDoSCustomPolicyUpdateTags();
}

main().catch(console.error);
