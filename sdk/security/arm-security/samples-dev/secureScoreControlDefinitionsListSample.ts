// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list the available security controls, their assessments, and the max score
 *
 * @summary list the available security controls, their assessments, and the max score
 * x-ms-original-file: 2020-01-01/secureScoreControlDefinitions/ListSecureScoreControlDefinitions_example.json
 */
async function listSecurityControlsDefinition(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const resArray = new Array();
  for await (const item of client.secureScoreControlDefinitions.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listSecurityControlsDefinition();
}

main().catch(console.error);
