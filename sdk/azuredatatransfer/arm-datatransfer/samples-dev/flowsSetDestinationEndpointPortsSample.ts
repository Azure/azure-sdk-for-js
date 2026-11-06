// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureDataTransferClient } from "@azure/arm-datatransfer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to set the destination endpoint ports for the specified flow.
 *
 * @summary set the destination endpoint ports for the specified flow.
 * x-ms-original-file: 2026-02-06-preview/setFlowDestinationEndpointPorts.json
 */
async function setTheFlowStreamDestinationEndpointPorts(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDataTransferClient(credential, subscriptionId);
  const result = await client.flows.setDestinationEndpointPorts(
    "testRG",
    "testConnection",
    "testFlow",
    { ports: [1234] },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await setTheFlowStreamDestinationEndpointPorts();
}

main().catch(console.error);
