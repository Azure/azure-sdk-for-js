// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { FrontDoorManagementClient } = require("@azure/arm-frontdoor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all available managed rule sets.
 *
 * @summary lists all available managed rule sets.
 * x-ms-original-file: 2025-10-01/WafListManagedRuleSets.json
 */
async function listPoliciesManagedRuleSetsInAResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new FrontDoorManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedRuleSets.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listPoliciesManagedRuleSetsInAResourceGroup();
}

main().catch(console.error);
