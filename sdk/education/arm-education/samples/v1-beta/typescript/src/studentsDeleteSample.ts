// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EducationManagementClient } from "@azure/arm-education";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete the specified student based on the student alias.
 *
 * @summary delete the specified student based on the student alias.
 * x-ms-original-file: 2021-12-01-preview/DeleteStudent.json
 */
async function deleteLab(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new EducationManagementClient(credential);
  await client.students.delete(
    "{billingAccountName}",
    "{billingProfileName}",
    "{invoiceSectionName}",
    "{studentAlias}",
  );
}

async function main(): Promise<void> {
  await deleteLab();
}

main().catch(console.error);
