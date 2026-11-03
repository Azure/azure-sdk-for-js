// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to exposes all available operations for discovery purposes.
 *
 * @summary exposes all available operations for discovery purposes.
 * x-ms-original-file: 2025-10-01-preview/Operations/ListOperations_example.json
 */
async function listTheOperationsForTheMicrosoftSecurityMicrosoftDefenderForCloudResourceProvider(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SecurityCenter(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listTheOperationsForTheMicrosoftSecurityMicrosoftDefenderForCloudResourceProvider();
}

main().catch(console.error);
