// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to check available SKUs.
 *
 * @summary check available SKUs.
 * x-ms-original-file: 2026-01-15-preview/CheckSkuAvailability.json
 */
async function checkSKUAvailability(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CognitiveServicesManagementClient(credential, subscriptionId);
  const result = await client.checkSkuAvailability(
    "westus",
    ["S0"],
    "Microsoft.CognitiveServices/accounts",
    "Face",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await checkSKUAvailability();
}

main().catch(console.error);
