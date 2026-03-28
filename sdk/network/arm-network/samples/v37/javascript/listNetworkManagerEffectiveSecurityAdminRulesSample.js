// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all effective security admin rules applied on a virtual network.
 *
 * @summary list all effective security admin rules applied on a virtual network.
 * x-ms-original-file: 2025-05-01/NetworkManagerEffectiveSecurityAdminRulesList.json
 */
async function listEffectiveSecurityAdminRules() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.listNetworkManagerEffectiveSecurityAdminRules(
    "myResourceGroup",
    "testVirtualNetwork",
    { skipToken: "FakeSkipTokenCode" },
  );
  console.log(result);
}

async function main() {
  await listEffectiveSecurityAdminRules();
}

main().catch(console.error);
