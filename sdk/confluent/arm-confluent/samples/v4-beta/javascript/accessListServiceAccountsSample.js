// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConfluentManagementClient } = require("@azure/arm-confluent");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to organization service accounts details
 *
 * @summary organization service accounts details
 * x-ms-original-file: 2025-08-18-preview/Access_ListServiceAccounts_MaximumSet_Gen.json
 */
async function accessListServiceAccountsMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DC34558A-05D3-4370-AED8-75E60B381F94";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.access.listServiceAccounts("rgconfluent", "go", {
    searchFilters: { key8083: "ft" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to organization service accounts details
 *
 * @summary organization service accounts details
 * x-ms-original-file: 2025-08-18-preview/Access_ListServiceAccounts_MinimumSet_Gen.json
 */
async function accessListServiceAccountsMinimumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DC34558A-05D3-4370-AED8-75E60B381F94";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.access.listServiceAccounts("rgconfluent", "ambiyuv", {});
  console.log(result);
}

async function main() {
  await accessListServiceAccountsMaximumSet();
  await accessListServiceAccountsMinimumSet();
}

main().catch(console.error);
