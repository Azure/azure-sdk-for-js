// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates the specified Defender for AI setting.
 *
 * @summary updates the specified Defender for AI setting.
 * x-ms-original-file: 2026-01-15-preview/UpdateDefenderForAISetting.json
 */
async function updateDefenderForAISetting(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.defenderForAISettings.update(
    "resourceGroupName",
    "accountName",
    "Default",
    { state: "Enabled" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateDefenderForAISetting();
}

main().catch(console.error);
