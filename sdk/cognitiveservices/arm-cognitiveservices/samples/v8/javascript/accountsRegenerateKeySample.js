// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Regenerates the specified account key for the specified Cognitive Services account.
 *
 * @summary Regenerates the specified account key for the specified Cognitive Services account.
 * x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2025-06-01/examples/RegenerateKey.json
 */
async function regenerateKeys() {
  const subscriptionId =
    process.env["COGNITIVESERVICES_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["COGNITIVESERVICES_RESOURCE_GROUP"] || "myResourceGroup";
  const accountName = "myAccount";
  const keyName = "Key2";
  const credential = new DefaultAzureCredential();
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.accounts.regenerateKey(resourceGroupName, accountName, keyName);
  console.log(result);
}

async function main() {
  await regenerateKeys();
}

main().catch(console.error);
