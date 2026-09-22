// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list secure scores for all your Microsoft Defender for Cloud initiatives within your current scope.
 *
 * @summary list secure scores for all your Microsoft Defender for Cloud initiatives within your current scope.
 * x-ms-original-file: 2020-01-01/secureScores/ListSecureScores_example.json
 */
async function listSecureScores(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.secureScores.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listSecureScores();
}

main().catch(console.error);
