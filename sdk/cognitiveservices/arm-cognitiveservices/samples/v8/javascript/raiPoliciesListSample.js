// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets the content filters associated with the Azure OpenAI account.
 *
 * @summary Gets the content filters associated with the Azure OpenAI account.
 * x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2025-06-01/examples/ListRaiPolicies.json
 */
async function listRaiPolicies() {
  const subscriptionId =
    process.env["COGNITIVESERVICES_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["COGNITIVESERVICES_RESOURCE_GROUP"] || "resourceGroupName";
  const accountName = "accountName";
  const credential = new DefaultAzureCredential();
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.raiPolicies.list(resourceGroupName, accountName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listRaiPolicies();
}

main().catch(console.error);
