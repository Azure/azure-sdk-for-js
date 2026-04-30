// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Updates tags of a service endpoint policy.
 *
 * @summary Updates tags of a service endpoint policy.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/ServiceEndpointPolicyUpdateTags.json
 */
async function updateServiceEndpointPolicyTags() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const serviceEndpointPolicyName = "testServiceEndpointPolicy";
  const parameters = { tags: { tag1: "value1", tag2: "value2" } };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.serviceEndpointPolicies.updateTags(
    resourceGroupName,
    serviceEndpointPolicyName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await updateServiceEndpointPolicyTags();
}

main().catch(console.error);
