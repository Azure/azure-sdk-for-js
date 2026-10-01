// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EducationManagementClient } from "@azure/arm-education";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the details for a specific student in the specified lab by student alias
 *
 * @summary get the details for a specific student in the specified lab by student alias
 * x-ms-original-file: 2021-12-01-preview/Student.json
 */
async function student(): Promise<void> {
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

async function main(): Promise<void> {
  await student();
}

main().catch(console.error);
