// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ProgramEnrollmentClient } = require("@azure/arm-programenrollment");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates the specified edu enrollment.
 *
 * @summary creates or updates the specified edu enrollment.
 * x-ms-original-file: 2026-03-01-preview/EduEnrollments_CreateOrUpdate.json
 */
async function createOrUpdateAnEduEnrollment() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ProgramEnrollmentClient(credential, subscriptionId);
  const result = await client.eduEnrollments.createOrUpdate("testrg", "default", {
    location: "eastus",
    properties: {
      domains: [
        {
          domainNames: ["university.edu", "college.edu"],
          tenantId: "00000000-0000-0000-0000-000000000001",
        },
      ],
    },
  });
  console.log(result);
}

async function main() {
  await createOrUpdateAnEduEnrollment();
}

main().catch(console.error);
