// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { GrantsGetOptionalParams } from "@azure/arm-education";
import { EducationManagementClient } from "@azure/arm-education";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Get details for a specific grant linked to the provided billing account and billing profile.
 *
 * @summary Get details for a specific grant linked to the provided billing account and billing profile.
 * x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/Grant.json
 */
async function grant(): Promise<void> {
  const billingAccountName = "{billingAccountName}";
  const billingProfileName = "{billingProfileName}";
  const includeAllocatedBudget = false;
  const options: GrantsGetOptionalParams = { includeAllocatedBudget };
  const credential = new DefaultAzureCredential();
  const client = new EducationManagementClient(credential);
  const result = await client.grants.get(billingAccountName, billingProfileName, options);
  console.log(result);
}

/**
 * This sample demonstrates how to Get details for a specific grant linked to the provided billing account and billing profile.
 *
 * @summary Get details for a specific grant linked to the provided billing account and billing profile.
 * x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/GrantIncludeAllocatedBudget.json
 */
async function grantIncludeAllocatedBudget(): Promise<void> {
  const billingAccountName = "{billingAccountName}";
  const billingProfileName = "{billingProfileName}";
  const includeAllocatedBudget = false;
  const options: GrantsGetOptionalParams = { includeAllocatedBudget };
  const credential = new DefaultAzureCredential();
  const client = new EducationManagementClient(credential);
  const result = await client.grants.get(billingAccountName, billingProfileName, options);
  console.log(result);
}

async function main(): Promise<void> {
  await grant();
  await grantIncludeAllocatedBudget();
}

main().catch(console.error);
