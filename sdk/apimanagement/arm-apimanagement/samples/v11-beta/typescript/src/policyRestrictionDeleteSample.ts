// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the policy restriction configuration of the Api Management Service.
 *
 * @summary deletes the policy restriction configuration of the Api Management Service.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementDeletePolicyRestriction.json
 */
async function apiManagementDeletePolicyRestriction(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.policyRestriction.delete("rg1", "apimService1", "policyRestriction1", {
    ifMatch: "*",
  });
}

async function main(): Promise<void> {
  await apiManagementDeletePolicyRestriction();
}

main().catch(console.error);
