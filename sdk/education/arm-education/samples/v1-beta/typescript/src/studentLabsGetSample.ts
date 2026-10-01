// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EducationManagementClient } from "@azure/arm-education";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the details for a specified lab associated with the student lab.
 *
 * @summary get the details for a specified lab associated with the student lab.
 * x-ms-original-file: 2021-12-01-preview/StudentLab.json
 */
async function studentLab(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new EducationManagementClient(credential);
  const result = await client.studentLabs.get("{studentLabName}");
  console.log(result);
}

async function main(): Promise<void> {
  await studentLab();
}

main().catch(console.error);
