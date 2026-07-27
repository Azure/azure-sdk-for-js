// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all the DDoS custom policies in a subscription.
 *
 * @summary gets all the DDoS custom policies in a subscription.
 * x-ms-original-file: 2025-07-01/DdosCustomPolicyListAll.json
 */
async function listAllDDoSCustomPoliciesInSubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.ddosCustomPolicies.listAll()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAllDDoSCustomPoliciesInSubscription();
}

main().catch(console.error);
