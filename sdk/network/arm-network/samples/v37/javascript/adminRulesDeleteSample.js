// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an admin rule.
 *
 * @summary deletes an admin rule.
 * x-ms-original-file: 2025-05-01/NetworkManagerAdminRuleDelete.json
 */
async function deletesAnAdminRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.adminRules.delete(
    "rg1",
    "testNetworkManager",
    "myTestSecurityConfig",
    "testRuleCollection",
    "SampleAdminRule",
    { force: false },
  );
}

async function main() {
  await deletesAnAdminRule();
}

main().catch(console.error);
