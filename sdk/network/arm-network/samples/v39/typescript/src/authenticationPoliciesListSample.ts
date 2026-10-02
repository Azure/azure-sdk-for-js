// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all of the authentication policies within a resource group.
 *
 * @summary lists all of the authentication policies within a resource group.
 * x-ms-original-file: 2026-01-01/AuthenticationPolicyList.json
 */
async function listsAuthenticationPoliciesInAResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.authenticationPolicies.list("rg1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listsAuthenticationPoliciesInAResourceGroup();
}

main().catch(console.error);
