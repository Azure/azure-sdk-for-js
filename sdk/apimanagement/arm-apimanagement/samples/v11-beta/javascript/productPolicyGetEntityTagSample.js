// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the ETag of the policy configuration at the Product level.
 *
 * @summary get the ETag of the policy configuration at the Product level.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementHeadProductPolicy.json
 */
async function apiManagementHeadProductPolicy() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.productPolicy.getEntityTag("rg1", "apimService1", "unlimited", "policy");
}

async function main() {
  await apiManagementHeadProductPolicy();
}

main().catch(console.error);
