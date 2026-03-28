// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a policy fragment.
 *
 * @summary gets a policy fragment.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGetWorkspacePolicyFragment.json
 */
async function apiManagementGetWorkspacePolicyFragment(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspacePolicyFragment.get(
    "rg1",
    "apimService1",
    "wks1",
    "policyFragment1",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets a policy fragment.
 *
 * @summary gets a policy fragment.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGetWorkspacePolicyFragmentFormat.json
 */
async function apiManagementGetWorkspacePolicyFragmentFormat(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspacePolicyFragment.get(
    "rg1",
    "apimService1",
    "wks1",
    "policyFragment1",
    { format: "rawxml" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementGetWorkspacePolicyFragment();
  await apiManagementGetWorkspacePolicyFragmentFormat();
}

main().catch(console.error);
