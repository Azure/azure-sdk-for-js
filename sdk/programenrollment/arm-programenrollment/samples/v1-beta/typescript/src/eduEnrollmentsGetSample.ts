// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ProgramEnrollmentClient } from "@azure/arm-programenrollment";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specified edu enrollment.
 *
 * @summary gets the specified edu enrollment.
 * x-ms-original-file: 2026-03-01-preview/EduEnrollments_Get.json
 */
async function getAnEduEnrollment(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ProgramEnrollmentClient(credential, subscriptionId);
  const result = await client.eduEnrollments.get("testrg", "default");
  console.log(result);
}

async function main(): Promise<void> {
  await getAnEduEnrollment();
}

main().catch(console.error);
