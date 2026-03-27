// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the safety providers associated with the subscription
 *
 * @summary gets the safety providers associated with the subscription
 * x-ms-original-file: 2026-01-15-preview/ListRaiExternalSafetyProviders.json
 */
async function listRaiExternalSafetyProviders() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.raiExternalSafetyProviders.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listRaiExternalSafetyProviders();
}

main().catch(console.error);
