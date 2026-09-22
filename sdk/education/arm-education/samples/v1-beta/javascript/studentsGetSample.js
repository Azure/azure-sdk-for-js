// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EducationManagementClient } = require("@azure/arm-education");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the details for a specific student in the specified lab by student alias
 *
 * @summary get the details for a specific student in the specified lab by student alias
 * x-ms-original-file: 2021-12-01-preview/Student.json
 */
async function student() {
  const credential = new DefaultAzureCredential();
  const client = new EducationManagementClient(credential);
  const result = await client.students.get(
    "{billingAccountName}",
    "{billingProfileName}",
    "{invoiceSectionName}",
    "{studentAlias}",
  );
  console.log(result);
}

async function main() {
  await student();
}

main().catch(console.error);
