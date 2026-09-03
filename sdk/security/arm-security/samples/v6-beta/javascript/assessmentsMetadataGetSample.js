// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get metadata information on an assessment type
 *
 * @summary get metadata information on an assessment type
 * x-ms-original-file: 2025-05-04/AssessmentsMetadata/GetAssessmentsMetadata_example.json
 */
async function getSecurityAssessmentMetadata() {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const result = await client.assessmentsMetadata.get("21300918-b2e3-0346-785f-c77ff57d243b");
  console.log(result);
}

async function main() {
  await getSecurityAssessmentMetadata();
}

main().catch(console.error);
