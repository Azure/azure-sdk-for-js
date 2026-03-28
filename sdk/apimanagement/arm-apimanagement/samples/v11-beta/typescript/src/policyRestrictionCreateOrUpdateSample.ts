// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates the policy restriction configuration of the Api Management service.
 *
 * @summary creates or updates the policy restriction configuration of the Api Management service.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreatePolicyRestriction.json
 */
async function apiManagementCreatePolicyRestriction(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.policyRestriction.createOrUpdate(
    "rg1",
    "apimService1",
    "policyRestriction1",
    { requireBase: "true", scope: "Sample Path to the policy document." },
    { ifMatch: "*" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementCreatePolicyRestriction();
}

main().catch(console.error);
