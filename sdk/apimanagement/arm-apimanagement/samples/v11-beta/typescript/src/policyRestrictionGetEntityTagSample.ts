// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the entity state (Etag) version of the policy restriction in the Api Management service.
 *
 * @summary gets the entity state (Etag) version of the policy restriction in the Api Management service.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementHeadPolicyRestriction.json
 */
async function apiManagementHeadPolicyRestriction(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.policyRestriction.getEntityTag("rg1", "apimService1", "policyRestriction1");
}

async function main(): Promise<void> {
  await apiManagementHeadPolicyRestriction();
}

main().catch(console.error);
