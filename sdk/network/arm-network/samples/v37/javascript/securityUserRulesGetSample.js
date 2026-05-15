// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a security user rule.
 *
 * @summary gets a security user rule.
 * x-ms-original-file: 2025-05-01/NetworkManagerSecurityUserRuleGet.json
 */
async function getsASecurityUserRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.securityUserRules.get(
    "rg1",
    "testNetworkManager",
    "myTestSecurityConfig",
    "testRuleCollection",
    "SampleUserRule",
  );
  console.log(result);
}

async function main() {
  await getsASecurityUserRule();
}

main().catch(console.error);
