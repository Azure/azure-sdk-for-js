// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to reconcile NSP access rules
 *
 * @summary reconcile NSP access rules
 * x-ms-original-file: 2025-05-01/NspAccessRuleReconcile.json
 */
async function nspAccessRuleReconcile() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkSecurityPerimeterAccessRules.reconcile(
    "rg1",
    "nsp1",
    "profile1",
    "accessRuleName1",
    { properties: {} },
  );
  console.log(result);
}

async function main() {
  await nspAccessRuleReconcile();
}

main().catch(console.error);
