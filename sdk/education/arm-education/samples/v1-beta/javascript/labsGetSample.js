// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EducationManagementClient } = require("@azure/arm-education");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the details for a specific lab associated with the provided billing account name, billing profile name, and invoice section name.
 *
 * @summary get the details for a specific lab associated with the provided billing account name, billing profile name, and invoice section name.
 * x-ms-original-file: 2021-12-01-preview/Lab.json
 */
async function lab() {
  const credential = new DefaultAzureCredential();
  const client = new EducationManagementClient(credential);
  const result = await client.labs.get(
    "{billingAccountName}",
    "{billingProfileName}",
    "{invoiceSectionName}",
    { includeBudget: false },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get the details for a specific lab associated with the provided billing account name, billing profile name, and invoice section name.
 *
 * @summary get the details for a specific lab associated with the provided billing account name, billing profile name, and invoice section name.
 * x-ms-original-file: 2021-12-01-preview/LabIncludeBudget.json
 */
async function labIncludeBudget() {
  const credential = new DefaultAzureCredential();
  const client = new EducationManagementClient(credential);
  const result = await client.labs.get(
    "{billingAccountName}",
    "{billingProfileName}",
    "{invoiceSectionName}",
    { includeBudget: true },
  );
  console.log(result);
}

async function main() {
  await lab();
  await labIncludeBudget();
}

main().catch(console.error);
