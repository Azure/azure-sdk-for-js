// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { FrontDoorManagementClient } = require("@azure/arm-frontdoor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all of the protection policies within a subscription.
 *
 * @summary lists all of the protection policies within a subscription.
 * x-ms-original-file: 2025-10-01/WafListPoliciesUnderSubscription.json
 */
async function getAllPoliciesInAResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new FrontDoorManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.policies.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getAllPoliciesInAResourceGroup();
}

main().catch(console.error);
