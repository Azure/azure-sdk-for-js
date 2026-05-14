// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or Updates the specified Defender for AI setting.
 *
 * @summary creates or Updates the specified Defender for AI setting.
 * x-ms-original-file: 2026-01-15-preview/PutDefenderForAISetting.json
 */
async function putDefenderForAISetting(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.defenderForAISettings.createOrUpdate(
    "resourceGroupName",
    "accountName",
    "Default",
    { state: "Enabled" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await putDefenderForAISetting();
}

main().catch(console.error);
