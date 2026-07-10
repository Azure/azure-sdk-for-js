// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets all the DDoS custom policies in a subscription.
 *
 * @summary gets all the DDoS custom policies in a subscription.
 * x-ms-original-file: 2025-07-01/DdosCustomPolicyListAll.json
 */
async function listAllDDoSCustomPoliciesInSubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.ddosCustomPolicies.listAll()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listAllDDoSCustomPoliciesInSubscription();
}

main().catch(console.error);
