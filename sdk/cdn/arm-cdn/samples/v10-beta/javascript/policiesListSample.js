// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CdnManagementClient } = require("@azure/arm-cdn");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all of the protection policies within a resource group.
 *
 * @summary lists all of the protection policies within a resource group.
 * x-ms-original-file: 2025-12-01/WafListPolicies.json
 */
async function listPoliciesInAResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CdnManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.policies.list("rg1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listPoliciesInAResourceGroup();
}

main().catch(console.error);
