// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a DDoS custom policy.
 *
 * @summary creates or updates a DDoS custom policy.
 * x-ms-original-file: 2026-03-01/DdosCustomPolicyCreate.json
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
    mitigationRules: [
      {
        name: "mitigationRuleTcp",
        properties: {
          trafficScope: "Tcp",
          tcpDefaultMitigations: {
            perSourceRateLimiting: { packetsPerSecond: 100000 },
            perSourceConnectionRateLimiting: { connectionsPerSecond: 1000 },
          },
          sourcePolicyOverrides: [
            {
              policyAction: { actionType: "Deny" },
              conditions: { ipPrefixes: ["198.51.100.0/24"], geoMatches: [{ countryCode: "CA" }] },
            },
            {
              policyAction: { actionType: "Permit" },
              conditions: {
                ipPrefixes: ["203.0.113.0/24"],
                geoMatches: [{ continent: "NorthAmerica" }],
              },
            },
          ],
        },
      },
      {
        name: "mitigationRuleUdp",
        properties: {
          trafficScope: "Udp",
          udpDefaultMitigations: { perSourceRateLimiting: { packetsPerSecond: 50000 } },
        },
      },
    ],
  });
  console.log(result);
}

async function main() {
  await createDDoSCustomPolicy();
}

main().catch(console.error);
