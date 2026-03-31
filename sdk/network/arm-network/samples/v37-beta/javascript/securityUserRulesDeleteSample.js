// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a security user rule.
 *
 * @summary deletes a security user rule.
 * x-ms-original-file: 2025-05-01/NetworkManagerSecurityUserRuleDelete.json
 */
async function deleteASecurityUserRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.securityUserRules.delete(
    "rg1",
    "testNetworkManager",
    "myTestSecurityConfig",
    "testRuleCollection",
    "SampleUserRule",
    { force: false },
  );
}

async function main() {
  await deleteASecurityUserRule();
}

main().catch(console.error);
