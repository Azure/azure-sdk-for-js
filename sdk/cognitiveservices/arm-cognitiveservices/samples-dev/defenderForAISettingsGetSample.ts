// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specified Defender for AI setting by name.
 *
 * @summary gets the specified Defender for AI setting by name.
 * x-ms-original-file: 2026-01-15-preview/GetDefenderForAISetting.json
 */
async function getDefenderForAISetting(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.defenderForAISettings.get(
    "resourceGroupName",
    "accountName",
    "Default",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getDefenderForAISetting();
}

main().catch(console.error);
