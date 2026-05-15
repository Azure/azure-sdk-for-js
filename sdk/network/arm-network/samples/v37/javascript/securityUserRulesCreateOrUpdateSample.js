// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a security user rule.
 *
 * @summary creates or updates a security user rule.
 * x-ms-original-file: 2025-05-01/NetworkManagerSecurityUserRulePut.json
 */
async function createASecurityUserRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.securityUserRules.createOrUpdate(
    "rg1",
    "testNetworkManager",
    "myTestSecurityConfig",
    "testRuleCollection",
    "SampleUserRule",
    {
      description: "Sample User Rule",
      destinationPortRanges: ["22"],
      destinations: [{ addressPrefix: "*", addressPrefixType: "IPPrefix" }],
      direction: "Inbound",
      sourcePortRanges: ["0-65535"],
      sources: [{ addressPrefix: "*", addressPrefixType: "IPPrefix" }],
      protocol: "Tcp",
    },
  );
  console.log(result);
}

async function main() {
  await createASecurityUserRule();
}

main().catch(console.error);
