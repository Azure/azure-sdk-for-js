// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the custom blocklists associated with the Azure OpenAI account.
 *
 * @summary gets the custom blocklists associated with the Azure OpenAI account.
 * x-ms-original-file: 2026-01-15-preview/ListBlocklists.json
 */
async function listBlocklists() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.raiBlocklists.list("resourceGroupName", "accountName")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listBlocklists();
}

main().catch(console.error);
