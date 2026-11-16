// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DurableTaskClient } from "@azure/arm-durabletask";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a Transparent Data Encryption
 *
 * @summary get a Transparent Data Encryption
 * x-ms-original-file: 2026-07-01-preview/TransparentDataEncryptions_Get_MaximumSet_Gen.json
 */
async function transparentDataEncryptionsGetMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "EE9BD735-67CE-4A90-89C4-439D3F6A4C93";
  const client = new DurableTaskClient(credential, subscriptionId);
  const result = await client.transparentDataEncryptions.get("rgdurabletask", "testscheduler");
  console.log(result);
}

async function main(): Promise<void> {
  await transparentDataEncryptionsGetMaximumSet();
}

main().catch(console.error);
