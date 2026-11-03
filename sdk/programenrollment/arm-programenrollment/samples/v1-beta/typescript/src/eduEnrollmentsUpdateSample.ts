// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ProgramEnrollmentClient } from "@azure/arm-programenrollment";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates the specified edu enrollment.
 *
 * @summary updates the specified edu enrollment.
 * x-ms-original-file: 2026-03-01-preview/EduEnrollments_Update.json
 */
async function updateAnEduEnrollment(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ProgramEnrollmentClient(credential, subscriptionId);
  const result = await client.eduEnrollments.update("testrg", "default", { tags: { env: "test" } });
  console.log(result);
}

async function main(): Promise<void> {
  await updateAnEduEnrollment();
}

main().catch(console.error);
