// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a DDoS custom policy.
 *
 * @summary creates or updates a DDoS custom policy.
 * x-ms-original-file: 2025-05-01/DdosCustomPolicyCreate.json
 */
async function createDDoSCustomPolicy() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.ddosCustomPolicies.createOrUpdate("rg1", "test-ddos-custom-policy", {
    location: "centraluseuap",
    detectionRules: [
      {
        name: "detectionRuleTcp",
        detectionMode: "TrafficThreshold",
        trafficDetectionRule: { packetsPerSecond: 1000000, trafficType: "Tcp" },
      },
    ],
  });
  console.log(result);
}

async function main() {
  await createDDoSCustomPolicy();
}

main().catch(console.error);
