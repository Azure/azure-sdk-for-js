// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EducationManagementClient } from "@azure/arm-education";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get details for a specific grant linked to the provided billing account and billing profile.
 *
 * @summary get details for a specific grant linked to the provided billing account and billing profile.
 * x-ms-original-file: 2021-12-01-preview/GrantDefaultList.json
 */
async function grantList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new EducationManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.grants.list("{billingAccountName}", "{billingProfileName}", {
    includeAllocatedBudget: false,
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to get details for a specific grant linked to the provided billing account and billing profile.
 *
 * @summary get details for a specific grant linked to the provided billing account and billing profile.
 * x-ms-original-file: 2021-12-01-preview/GrantDefaultListIncludeAllocatedBudget.json
 */
async function grantListIncludeAllocatedBudget(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new EducationManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.grants.list("{billingAccountName}", "{billingProfileName}", {
    includeAllocatedBudget: false,
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await grantList();
  await grantListIncludeAllocatedBudget();
}

main().catch(console.error);
