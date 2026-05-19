// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all RAI Tool Labels associated with the Azure OpenAI account.
 *
 * @summary lists all RAI Tool Labels associated with the Azure OpenAI account.
 * x-ms-original-file: 2026-01-15-preview/ListRaiToolLabels.json
 */
async function listRaiToolLabels() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.raiToolLabels.list("resourceGroupName", "accountName")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listRaiToolLabels();
}

main().catch(console.error);
