// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AdvisorManagementClient } = require("@azure/arm-advisor");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all triage resources that belong to a review and recommendation.
 *
 * @summary list all triage resources that belong to a review and recommendation.
 * x-ms-original-file: 2026-02-01-preview/TriageResourcesList.json
 */
async function listTriageResources() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AdvisorManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.triageResources.list(
    "11111111-1111-2222-3333-444444444445",
    "22222222-1111-2222-3333-444444444444",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listTriageResources();
}

main().catch(console.error);
