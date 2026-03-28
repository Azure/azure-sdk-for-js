// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns the etag of an API release.
 *
 * @summary returns the etag of an API release.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementHeadApiRelease.json
 */
async function apiManagementHeadApiRelease() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.apiRelease.getEntityTag("rg1", "apimService1", "a1", "5a7cb545298324c53224a799");
}

async function main() {
  await apiManagementHeadApiRelease();
}

main().catch(console.error);
