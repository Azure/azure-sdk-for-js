// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConfluentManagementClient } from "@azure/arm-confluent";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to organization users details
 *
 * @summary organization users details
 * x-ms-original-file: 2025-08-18-preview/Access_ListUsers_MaximumSet_Gen.json
 */
async function accessListUsersMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DC34558A-05D3-4370-AED8-75E60B381F94";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.access.listUsers("rgconfluent", "iggbjjnfqgutjxyvnlriqdm", {
    searchFilters: { key8083: "ft" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to organization users details
 *
 * @summary organization users details
 * x-ms-original-file: 2025-08-18-preview/Access_ListUsers_MinimumSet_Gen.json
 */
async function accessListUsersMinimumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DC34558A-05D3-4370-AED8-75E60B381F94";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.access.listUsers("rgconfluent", "elqetgujssclojggilbgl", {});
  console.log(result);
}

async function main(): Promise<void> {
  await accessListUsersMaximumSet();
  await accessListUsersMinimumSet();
}

main().catch(console.error);
