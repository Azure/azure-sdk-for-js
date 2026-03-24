// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists policy resources that reference the policy fragment.
 *
 * @summary lists policy resources that reference the policy fragment.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementListPolicyFragmentReferences.json
 */
async function apiManagementListPolicyFragmentReferences() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.policyFragment.listReferences(
    "rg1",
    "apimService1",
    "policyFragment1",
  );
  console.log(result);
}

async function main() {
  await apiManagementListPolicyFragmentReferences();
}

main().catch(console.error);
