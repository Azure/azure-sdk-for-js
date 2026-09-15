// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates the specified FirewallPolicyKubeSelectorGroup.
 *
 * @summary creates or updates the specified FirewallPolicyKubeSelectorGroup.
 * x-ms-original-file: 2025-09-01/FirewallPolicyKubeSelectorGroupPut.json
 */
async function createFirewallPolicyKubeSelectorGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.firewallPolicyKubeSelectorGroups.createOrUpdate(
    "rg1",
    "firewallPolicy",
    "kubeSelectorGroup1",
    {
      properties: {
        podSelector: {
          matchLabels: { app: "web", env: "production" },
          matchExpressions: [{ key: "tier", operator: "In", values: ["frontend", "backend"] }],
        },
        namespaceSelector: { matchLabels: { "kubernetes.io/metadata.name": "production" } },
      },
    },
  );
  console.log(result);
}

async function main() {
  await createFirewallPolicyKubeSelectorGroup();
}

main().catch(console.error);
