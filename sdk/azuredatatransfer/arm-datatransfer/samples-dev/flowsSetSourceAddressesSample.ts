// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureDataTransferClient } from "@azure/arm-datatransfer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to set the source addresses for the specified flow.
 *
 * @summary set the source addresses for the specified flow.
 * x-ms-original-file: 2026-02-06-preview/setFlowSourceAddresses.json
 */
async function setTheFlowStreamSourceAddresses(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDataTransferClient(credential, subscriptionId);
  const result = await client.flows.setSourceAddresses("testRG", "testConnection", "testFlow", {
    values: ["0.0.0.0", "1.0.0.0/24"],
  });
  console.log(result);
}

async function main(): Promise<void> {
  await setTheFlowStreamSourceAddresses();
}

main().catch(console.error);
