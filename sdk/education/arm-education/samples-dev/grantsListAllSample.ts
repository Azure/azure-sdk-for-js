// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get a list of grants that Microsoft has provided.
 *
 * @summary Get a list of grants that Microsoft has provided.
 * x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/GrantList.json
 */

import type { GrantsListAllOptionalParams } from "@azure/arm-education";
import { EducationManagementClient } from "@azure/arm-education";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function grantList(): Promise<void> {
  const includeAllocatedBudget = false;
  const options: GrantsListAllOptionalParams = { includeAllocatedBudget };
  const credential = new DefaultAzureCredential();
  const client = new EducationManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.grants.listAll(options)) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to Get a list of grants that Microsoft has provided.
 *
 * @summary Get a list of grants that Microsoft has provided.
 * x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/GrantListIncludeAllocatedBudget.json
 */
async function grantListIncludeAllocatedBudget(): Promise<void> {
  const includeAllocatedBudget = true;
  const options: GrantsListAllOptionalParams = { includeAllocatedBudget };
  const credential = new DefaultAzureCredential();
  const client = new EducationManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.grants.listAll(options)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await grantList();
  await grantListIncludeAllocatedBudget();
}

main().catch(console.error);
