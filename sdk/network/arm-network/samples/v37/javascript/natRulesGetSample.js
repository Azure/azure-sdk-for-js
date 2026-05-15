// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves the details of a nat ruleGet.
 *
 * @summary retrieves the details of a nat ruleGet.
 * x-ms-original-file: 2025-05-01/NatRuleGet.json
 */
async function natRuleGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.natRules.get("rg1", "gateway1", "natRule1");
  console.log(result);
}

async function main() {
  await natRuleGet();
}

main().catch(console.error);
