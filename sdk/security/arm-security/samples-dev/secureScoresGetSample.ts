// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get secure score for a specific Microsoft Defender for Cloud initiative within your current scope. For the ASC Default initiative, use 'ascScore'.
 *
 * @summary Get secure score for a specific Microsoft Defender for Cloud initiative within your current scope. For the ASC Default initiative, use 'ascScore'.
 * x-ms-original-file: specification/security/resource-manager/Microsoft.Security/stable/2020-01-01/examples/secureScores/GetSecureScoresSingle_example.json
 */

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getSingleSecureScore(): Promise<void> {
  const subscriptionId =
    process.env["SECURITY_SUBSCRIPTION_ID"] || "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const secureScoreName = "ascScore";
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.secureScores.get(secureScoreName);
  console.log(result);
}

async function main(): Promise<void> {
  await getSingleSecureScore();
}

main().catch(console.error);
