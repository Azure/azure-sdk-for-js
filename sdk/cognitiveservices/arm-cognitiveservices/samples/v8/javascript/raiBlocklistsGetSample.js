// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets the specified custom blocklist associated with the Azure OpenAI account.
 *
 * @summary Gets the specified custom blocklist associated with the Azure OpenAI account.
 * x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2025-06-01/examples/GetRaiBlocklist.json
 */
async function getRaiBlocklist() {
  const subscriptionId =
    process.env["COGNITIVESERVICES_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["COGNITIVESERVICES_RESOURCE_GROUP"] || "resourceGroupName";
  const accountName = "accountName";
  const raiBlocklistName = "raiBlocklistName";
  const credential = new DefaultAzureCredential();
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.raiBlocklists.get(resourceGroupName, accountName, raiBlocklistName);
  console.log(result);
}

async function main() {
  await getRaiBlocklist();
}

main().catch(console.error);
