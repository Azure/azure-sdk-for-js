// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the policy restriction of the Api Management service.
 *
 * @summary get the policy restriction of the Api Management service.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGetPolicyRestriction.json
 */
async function apiManagementGetPolicyRestriction(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.policyRestriction.get("rg1", "apimService1", "policyRestriction1");
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementGetPolicyRestriction();
}

main().catch(console.error);
