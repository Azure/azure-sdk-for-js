// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to for a specified subscription, list the available security controls, their assessments, and the max score
 *
 * @summary for a specified subscription, list the available security controls, their assessments, and the max score
 * x-ms-original-file: 2020-01-01/secureScoreControlDefinitions/ListSecureScoreControlDefinitions_subscription_example.json
 */
async function listSecurityControlsDefinitionBySubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.secureScoreControlDefinitions.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listSecurityControlsDefinitionBySubscription();
}

main().catch(console.error);
