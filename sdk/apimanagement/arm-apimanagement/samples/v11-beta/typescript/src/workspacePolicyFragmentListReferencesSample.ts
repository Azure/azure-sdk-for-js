// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists policy resources that reference the policy fragment.
 *
 * @summary lists policy resources that reference the policy fragment.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementListWorkspacePolicyFragmentReferences.json
 */
async function apiManagementListWorkspacePolicyFragmentReferences(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspacePolicyFragment.listReferences(
    "rg1",
    "apimService1",
    "wks1",
    "policyFragment1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementListWorkspacePolicyFragmentReferences();
}

main().catch(console.error);
