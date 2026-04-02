// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the specified custom blocklist associated with the Azure OpenAI account.
 *
 * @summary gets the specified custom blocklist associated with the Azure OpenAI account.
 * x-ms-original-file: 2026-01-15-preview/GetRaiBlocklist.json
 */
async function getRaiBlocklist() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.raiBlocklists.get(
    "resourceGroupName",
    "accountName",
    "raiBlocklistName",
  );
  console.log(result);
}

async function main() {
  await getRaiBlocklist();
}

main().catch(console.error);
