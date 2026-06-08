// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EducationManagementClient } = require("@azure/arm-education");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to generate invite code for a lab
 *
 * @summary generate invite code for a lab
 * x-ms-original-file: 2021-12-01-preview/GenerateInviteCode.json
 */
async function createLab() {
  const credential = new DefaultAzureCredential();
  const client = new EducationManagementClient(credential);
  const result = await client.labs.generateInviteCode(
    "{billingAccountName}",
    "{billingProfileName}",
    "{invoiceSectionName}",
    { maxStudentCount: 10 },
  );
  console.log(result);
}

async function main() {
  await createLab();
}

main().catch(console.error);
