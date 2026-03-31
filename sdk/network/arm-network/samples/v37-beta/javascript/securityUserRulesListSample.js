// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all Security User Rules in a rule collection.
 *
 * @summary lists all Security User Rules in a rule collection.
 * x-ms-original-file: 2025-05-01/NetworkManagerSecurityUserRuleList.json
 */
async function listSecurityUserRules() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.securityUserRules.list(
    "rg1",
    "testNetworkManager",
    "myTestSecurityConfig",
    "testRuleCollection",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listSecurityUserRules();
}

main().catch(console.error);
