// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a policy fragment.
 *
 * @summary gets a policy fragment.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementGetWorkspacePolicyFragment.json
 */
async function apiManagementGetWorkspacePolicyFragment() {
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
async function apiManagementGetWorkspacePolicyFragmentFormat() {
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

async function main() {
  await apiManagementGetWorkspacePolicyFragment();
  await apiManagementGetWorkspacePolicyFragmentFormat();
}

main().catch(console.error);
