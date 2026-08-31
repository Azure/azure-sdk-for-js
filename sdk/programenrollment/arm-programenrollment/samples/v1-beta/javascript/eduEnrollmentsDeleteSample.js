// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ProgramEnrollmentClient } = require("@azure/arm-programenrollment");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified edu enrollment.
 *
 * @summary deletes the specified edu enrollment.
 * x-ms-original-file: 2026-03-01-preview/EduEnrollments_Delete.json
 */
async function deleteAnEduEnrollment() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ProgramEnrollmentClient(credential, subscriptionId);
  await client.eduEnrollments.delete("testrg", "default");
}

async function main() {
  await deleteAnEduEnrollment();
}

main().catch(console.error);
