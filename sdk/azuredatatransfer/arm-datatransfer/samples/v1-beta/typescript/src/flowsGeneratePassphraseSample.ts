// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureDataTransferClient } from "@azure/arm-datatransfer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to generate a compliant passphrase for the specified flow.
 *
 * @summary generate a compliant passphrase for the specified flow.
 * x-ms-original-file: 2026-02-06-preview/generateFlowPassphrase.json
 */
async function generateANewCompliantStreamingPassphrase(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDataTransferClient(credential, subscriptionId);
  const result = await client.flows.generatePassphrase("testRG", "testConnection", "testFlow");
  console.log(result);
}

async function main(): Promise<void> {
  await generateANewCompliantStreamingPassphrase();
}

main().catch(console.error);
