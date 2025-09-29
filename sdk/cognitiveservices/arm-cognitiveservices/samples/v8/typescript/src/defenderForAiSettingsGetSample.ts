// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets the specified Defender for AI setting by name.
 *
 * @summary Gets the specified Defender for AI setting by name.
 * x-ms-original-file: specification/cognitiveservices/resource-manager/Microsoft.CognitiveServices/stable/2025-06-01/examples/GetDefenderForAISetting.json
 */
async function getDefenderForAiSetting(): Promise<void> {
  const subscriptionId =
    process.env["COGNITIVESERVICES_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["COGNITIVESERVICES_RESOURCE_GROUP"] || "resourceGroupName";
  const accountName = "accountName";
  const defenderForAISettingName = "Default";
  const credential = new DefaultAzureCredential();
  const client = new CognitiveServicesManagementClient(
    credential,
    subscriptionId,
  );
  const result = await client.defenderForAISettings.get(
    resourceGroupName,
    accountName,
    defenderForAISettingName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getDefenderForAiSetting();
}

main().catch(console.error);
