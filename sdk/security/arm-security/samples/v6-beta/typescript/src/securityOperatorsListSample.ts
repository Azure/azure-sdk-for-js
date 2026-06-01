// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists Microsoft Defender for Cloud securityOperators in the subscription.
 *
 * @summary lists Microsoft Defender for Cloud securityOperators in the subscription.
 * x-ms-original-file: 2023-01-01-preview/SecurityOperators/ListSecurityOperators_example.json
 */
async function listSecurityOperators(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.securityOperators.list("CloudPosture")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listSecurityOperators();
}

main().catch(console.error);
