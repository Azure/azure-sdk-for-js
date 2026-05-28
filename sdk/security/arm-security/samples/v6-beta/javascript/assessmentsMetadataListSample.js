// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get metadata information on all assessment types
 *
 * @summary get metadata information on all assessment types
 * x-ms-original-file: 2025-05-04/AssessmentsMetadata/ListAssessmentsMetadata_example.json
 */
async function listSecurityAssessmentMetadata() {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const resArray = new Array();
  for await (const item of client.assessmentsMetadata.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listSecurityAssessmentMetadata();
}

main().catch(console.error);
