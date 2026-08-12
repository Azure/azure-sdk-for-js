// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieves the details of all ConnectionPolicies.
 *
 * @summary retrieves the details of all ConnectionPolicies.
 * x-ms-original-file: 2025-07-01/ConnectionPolicyList.json
 */
async function connectionPolicyList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.connectionPolicies.list("rg1", "TestHub")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await connectionPolicyList();
}

main().catch(console.error);
