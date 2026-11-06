// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureDataTransferClient } from "@azure/arm-datatransfer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to sets the passphrase of the specified flow.
 *
 * @summary sets the passphrase of the specified flow.
 * x-ms-original-file: 2026-02-06-preview/setFlowPassphrase.json
 */
async function setTheFlowStreamPassphrase(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDataTransferClient(credential, subscriptionId);
  const result = await client.flows.setPassphrase("testRG", "testConnection", "testFlow", {
    value: "password123",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await setTheFlowStreamPassphrase();
}

main().catch(console.error);
