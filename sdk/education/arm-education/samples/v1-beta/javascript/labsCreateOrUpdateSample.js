// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EducationManagementClient } = require("@azure/arm-education");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a new lab or update a previously created lab.
 *
 * @summary create a new lab or update a previously created lab.
 * x-ms-original-file: 2021-12-01-preview/CreateLab.json
 */
async function createLab() {
  const credential = new DefaultAzureCredential();
  const client = new EducationManagementClient(credential);
  const result = await client.labs.createOrUpdate(
    "{billingAccountName}",
    "{billingProfileName}",
    "{invoiceSectionName}",
    {
      description: "example lab description",
      budgetPerStudent: { currency: "USD", value: 100 },
      displayName: "example lab",
      expirationDate: new Date("2021-12-09T22:11:29.422Z"),
    },
  );
  console.log(result);
}

async function main() {
  await createLab();
}

main().catch(console.error);
