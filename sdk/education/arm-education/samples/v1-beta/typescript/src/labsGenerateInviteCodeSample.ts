// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EducationManagementClient } from "@azure/arm-education";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to generate invite code for a lab
 *
 * @summary generate invite code for a lab
 * x-ms-original-file: 2021-12-01-preview/GenerateInviteCode.json
 */
async function createLab(): Promise<void> {
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

async function main(): Promise<void> {
  await createLab();
}

main().catch(console.error);
