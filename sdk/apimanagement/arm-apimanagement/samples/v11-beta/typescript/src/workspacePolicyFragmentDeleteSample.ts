// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a policy fragment.
 *
 * @summary deletes a policy fragment.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementDeleteWorkspacePolicyFragment.json
 */
async function apiManagementDeleteWorkspacePolicyFragment(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.workspacePolicyFragment.delete(
    "rg1",
    "apimService1",
    "wks1",
    "policyFragment1",
    "*",
  );
}

async function main(): Promise<void> {
  await apiManagementDeleteWorkspacePolicyFragment();
}

main().catch(console.error);
