// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get secure score for a specific Microsoft Defender for Cloud initiative within your current scope. For the ASC Default initiative, use 'ascScore'.
 *
 * @summary get secure score for a specific Microsoft Defender for Cloud initiative within your current scope. For the ASC Default initiative, use 'ascScore'.
 * x-ms-original-file: 2020-01-01/secureScores/GetSecureScoresSingle_example.json
 */
async function getSingleSecureScore(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.secureScores.get("ascScore");
  console.log(result);
}

async function main(): Promise<void> {
  await getSingleSecureScore();
}

main().catch(console.error);
