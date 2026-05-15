// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the NSP access rules in the specified NSP profile.
 *
 * @summary lists the NSP access rules in the specified NSP profile.
 * x-ms-original-file: 2025-05-01/NspAccessRuleList.json
 */
async function nspAccessRulesList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.networkSecurityPerimeterAccessRules.list(
    "rg1",
    "nsp1",
    "profile1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await nspAccessRulesList();
}

main().catch(console.error);
