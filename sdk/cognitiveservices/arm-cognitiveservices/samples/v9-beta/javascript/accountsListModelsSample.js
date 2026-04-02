// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list available Models for the requested Cognitive Services account
 *
 * @summary list available Models for the requested Cognitive Services account
 * x-ms-original-file: 2026-01-15-preview/ListAccountModels.json
 */
async function listAccountModels() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.accounts.listModels("resourceGroupName", "accountName")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAccountModels();
}

main().catch(console.error);
