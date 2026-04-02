// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the commitmentPlans associated with the Cognitive Services account.
 *
 * @summary gets the commitmentPlans associated with the Cognitive Services account.
 * x-ms-original-file: 2026-01-15-preview/ListCommitmentPlans.json
 */
async function listCommitmentPlans() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.commitmentPlans.list("resourceGroupName", "accountName")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listCommitmentPlans();
}

main().catch(console.error);
