// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the entity state (Etag) version of a policy fragment.
 *
 * @summary gets the entity state (Etag) version of a policy fragment.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementHeadPolicyFragment.json
 */
async function apiManagementHeadPolicyFragment() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.policyFragment.getEntityTag("rg1", "apimService1", "policyFragment1");
}

async function main() {
  await apiManagementHeadPolicyFragment();
}

main().catch(console.error);
