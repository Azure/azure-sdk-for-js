// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to checks that API entity specified by identifier is associated with the Product entity.
 *
 * @summary checks that API entity specified by identifier is associated with the Product entity.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementHeadProductApi.json
 */
async function apiManagementHeadProductApi() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.productApi.checkEntityExists(
    "rg1",
    "apimService1",
    "5931a75ae4bbd512a88c680b",
    "59306a29e4bbd510dc24e5f9",
  );
}

async function main() {
  await apiManagementHeadProductApi();
}

main().catch(console.error);
