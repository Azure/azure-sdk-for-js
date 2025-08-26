// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Generate invite code for a lab
 *
 * @summary Generate invite code for a lab
 * x-ms-original-file: specification/education/resource-manager/Microsoft.Education/preview/2021-12-01-preview/examples/GenerateInviteCode.json
 */

import type { InviteCodeGenerateRequest } from "@azure/arm-education";
import { EducationManagementClient } from "@azure/arm-education";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createLab(): Promise<void> {
  const billingAccountName = "{billingAccountName}";
  const billingProfileName = "{billingProfileName}";
  const invoiceSectionName = "{invoiceSectionName}";
  const parameters: InviteCodeGenerateRequest = { maxStudentCount: 10 };
  const credential = new DefaultAzureCredential();
  const client = new EducationManagementClient(credential);
  const result = await client.labs.generateInviteCode(
    billingAccountName,
    billingProfileName,
    invoiceSectionName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createLab();
}

main().catch(console.error);
