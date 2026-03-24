// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a policy fragment.
 *
 * @summary deletes a policy fragment.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementDeleteWorkspacePolicyFragment.json
 */
async function apiManagementDeleteWorkspacePolicyFragment() {
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

async function main() {
  await apiManagementDeleteWorkspacePolicyFragment();
}

main().catch(console.error);
