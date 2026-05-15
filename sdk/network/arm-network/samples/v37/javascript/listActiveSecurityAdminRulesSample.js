// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists active security admin rules in a network manager.
 *
 * @summary lists active security admin rules in a network manager.
 * x-ms-original-file: 2025-05-01/NetworkManagerActiveSecurityAdminRulesList.json
 */
async function listActiveSecurityAdminRules() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.listActiveSecurityAdminRules(
    "myResourceGroup",
    "testNetworkManager",
    { regions: ["westus"], skipToken: "fakeSkipTokenCode" },
  );
  console.log(result);
}

async function main() {
  await listActiveSecurityAdminRules();
}

main().catch(console.error);
