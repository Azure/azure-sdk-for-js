// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AdvisorManagementClient } = require("@azure/arm-advisor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get an existing Azure Advisor assessment.
 *
 * @summary get an existing Azure Advisor assessment.
 * x-ms-original-file: 2026-02-01-preview/GetAssessment.json
 */
async function getAssessment() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AdvisorManagementClient(credential, subscriptionId);
  const result = await client.assessments.get("assessment1");
  console.log(result);
}

async function main() {
  await getAssessment();
}

main().catch(console.error);
