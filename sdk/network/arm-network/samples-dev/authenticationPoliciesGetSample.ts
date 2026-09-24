// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieve the authentication policy with specified name within a resource group.
 *
 * @summary retrieve the authentication policy with specified name within a resource group.
 * x-ms-original-file: 2026-01-01/AuthenticationPolicyGet.json
 */
async function getsAJWTValidationAuthenticationPolicyWithinAResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.authenticationPolicies.get("rg1", "authPolicy1");
  console.log(result);
}

async function main(): Promise<void> {
  await getsAJWTValidationAuthenticationPolicyWithinAResourceGroup();
}

main().catch(console.error);
