// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Updates the specified Defender for AI setting.
 *
 * @summary Updates the specified Defender for AI setting.
 * x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2025-06-01/examples/UpdateDefenderForAISetting.json
 */
async function updateDefenderForAiSetting() {
  const subscriptionId =
    process.env["COGNITIVESERVICES_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["COGNITIVESERVICES_RESOURCE_GROUP"] || "resourceGroupName";
  const accountName = "accountName";
  const defenderForAISettingName = "Default";
  const defenderForAISettings = { state: "Enabled" };
  const credential = new DefaultAzureCredential();
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.defenderForAISettings.update(
    resourceGroupName,
    accountName,
    defenderForAISettingName,
    defenderForAISettings,
  );
  console.log(result);
}

async function main() {
  await updateDefenderForAiSetting();
}

main().catch(console.error);
