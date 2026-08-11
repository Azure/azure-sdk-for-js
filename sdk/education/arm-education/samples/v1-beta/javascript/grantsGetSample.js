// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EducationManagementClient } = require("@azure/arm-education");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get details for a specific grant linked to the provided billing account and billing profile.
 *
 * @summary get details for a specific grant linked to the provided billing account and billing profile.
 * x-ms-original-file: 2021-12-01-preview/Grant.json
 */
async function grant() {
  const credential = new DefaultAzureCredential();
  const client = new EducationManagementClient(credential);
  const result = await client.grants.get("{billingAccountName}", "{billingProfileName}", {
    includeAllocatedBudget: false,
  });
  console.log(result);
}

/**
 * This sample demonstrates how to get details for a specific grant linked to the provided billing account and billing profile.
 *
 * @summary get details for a specific grant linked to the provided billing account and billing profile.
 * x-ms-original-file: 2021-12-01-preview/GrantIncludeAllocatedBudget.json
 */
async function grantIncludeAllocatedBudget() {
  const credential = new DefaultAzureCredential();
  const client = new EducationManagementClient(credential);
  const result = await client.grants.get("{billingAccountName}", "{billingProfileName}", {
    includeAllocatedBudget: false,
  });
  console.log(result);
}

async function main() {
  await grant();
  await grantIncludeAllocatedBudget();
}

main().catch(console.error);
