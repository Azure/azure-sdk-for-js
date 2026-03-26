// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list Models.
 *
 * @summary list Models.
 * x-ms-original-file: 2026-01-15-preview/ListLocationModels.json
 */
async function listLocationModels() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.models.list("WestUS")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listLocationModels();
}

main().catch(console.error);
