// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates an admin rule.
 *
 * @summary creates or updates an admin rule.
 * x-ms-original-file: 2025-05-01/NetworkManagerAdminRulePut.json
 */
async function createAnAdminRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.adminRules.createOrUpdate(
    "rg1",
    "testNetworkManager",
    "myTestSecurityConfig",
    "testRuleCollection",
    "SampleAdminRule",
    {
      kind: "Custom",
      description: "This is Sample Admin Rule",
      access: "Deny",
      destinationPortRanges: ["22"],
      destinations: [{ addressPrefix: "*", addressPrefixType: "IPPrefix" }],
      direction: "Inbound",
      priority: 1,
      sourcePortRanges: ["0-65535"],
      sources: [{ addressPrefix: "Internet", addressPrefixType: "ServiceTag" }],
      protocol: "Tcp",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to creates or updates an admin rule.
 *
 * @summary creates or updates an admin rule.
 * x-ms-original-file: 2025-05-01/NetworkManagerAdminRulePut_NetworkGroupSource.json
 */
async function createAAdminRuleWithNetworkGroupAsSourceOrDestination() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.adminRules.createOrUpdate(
    "rg1",
    "testNetworkManager",
    "myTestSecurityConfig",
    "testRuleCollection",
    "SampleAdminRule",
    {
      kind: "Custom",
      description: "This is Sample Admin Rule",
      access: "Deny",
      destinationPortRanges: ["22"],
      destinations: [
        {
          addressPrefix:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.Network/networkManagers/testNetworkManager/networkGroups/ng1",
          addressPrefixType: "NetworkGroup",
        },
      ],
      direction: "Inbound",
      priority: 1,
      sourcePortRanges: ["0-65535"],
      sources: [{ addressPrefix: "Internet", addressPrefixType: "ServiceTag" }],
      protocol: "Tcp",
    },
  );
  console.log(result);
}

async function main() {
  await createAnAdminRule();
  await createAAdminRuleWithNetworkGroupAsSourceOrDestination();
}

main().catch(console.error);
