// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EducationManagementClient } from "@azure/arm-education";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a list of grants that Microsoft has provided.
 *
 * @summary get a list of grants that Microsoft has provided.
 * x-ms-original-file: 2021-12-01-preview/GrantList.json
 */
async function grantList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new EducationManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.grants.listAll({ includeAllocatedBudget: false })) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to get a list of grants that Microsoft has provided.
 *
 * @summary get a list of grants that Microsoft has provided.
 * x-ms-original-file: 2021-12-01-preview/GrantListIncludeAllocatedBudget.json
 */
async function grantListIncludeAllocatedBudget(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new EducationManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.grants.listAll({ includeAllocatedBudget: true })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await grantList();
  await grantListIncludeAllocatedBudget();
}

main().catch(console.error);
