// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list Commitment Tiers.
 *
 * @summary list Commitment Tiers.
 * x-ms-original-file: 2026-01-15-preview/ListCommitmentTiers.json
 */
async function listCommitmentTiers() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.commitmentTiers.list("location")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listCommitmentTiers();
}

main().catch(console.error);
