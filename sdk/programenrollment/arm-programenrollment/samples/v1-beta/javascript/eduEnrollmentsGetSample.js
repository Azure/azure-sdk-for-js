// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ProgramEnrollmentClient } = require("@azure/arm-programenrollment");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the specified edu enrollment.
 *
 * @summary gets the specified edu enrollment.
 * x-ms-original-file: 2026-03-01-preview/EduEnrollments_Get.json
 */
async function getAnEduEnrollment() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ProgramEnrollmentClient(credential, subscriptionId);
  const result = await client.eduEnrollments.get("testrg", "default");
  console.log(result);
}

async function main() {
  await getAnEduEnrollment();
}

main().catch(console.error);
