// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Creates or Updates the specified Defender for AI setting.
 *
 * @summary Creates or Updates the specified Defender for AI setting.
 * x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2025-06-01/examples/PutDefenderForAISetting.json
 */
async function putDefenderForAiSetting() {
  const subscriptionId =
    process.env["COGNITIVESERVICES_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["COGNITIVESERVICES_RESOURCE_GROUP"] || "resourceGroupName";
  const accountName = "accountName";
  const defenderForAISettingName = "Default";
  const defenderForAISettings = { state: "Enabled" };
  const credential = new DefaultAzureCredential();
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.defenderForAISettings.createOrUpdate(
    resourceGroupName,
    accountName,
    defenderForAISettingName,
    defenderForAISettings,
  );
  console.log(result);
}

async function main() {
  await putDefenderForAiSetting();
}

main().catch(console.error);
