// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets all default security rules in a network security group.
 *
 * @summary gets all default security rules in a network security group.
 * x-ms-original-file: 2025-05-01/DefaultSecurityRuleList.json
 */
async function defaultSecurityRuleList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.defaultSecurityRules.list("testrg", "nsg1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await defaultSecurityRuleList();
}

main().catch(console.error);
