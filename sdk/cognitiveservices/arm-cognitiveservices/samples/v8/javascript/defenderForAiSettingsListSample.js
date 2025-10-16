// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Lists the Defender for AI settings.
 *
 * @summary Lists the Defender for AI settings.
 * x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2025-06-01/examples/ListDefenderForAISetting.json
 */
async function listDefenderForAiSetting() {
  const subscriptionId =
    process.env["COGNITIVESERVICES_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["COGNITIVESERVICES_RESOURCE_GROUP"] || "resourceGroupName";
  const accountName = "accountName";
  const credential = new DefaultAzureCredential();
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.defenderForAISettings.list(resourceGroupName, accountName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listDefenderForAiSetting();
}

main().catch(console.error);
