// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to regenerate secondary access key for GIT.
 *
 * @summary regenerate secondary access key for GIT.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementTenantAccessRegenerateKey.json
 */
async function apiManagementTenantAccessRegenerateKey(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.tenantAccessGit.regenerateSecondaryKey("rg1", "apimService1", "access");
}

async function main(): Promise<void> {
  await apiManagementTenantAccessRegenerateKey();
}

main().catch(console.error);
