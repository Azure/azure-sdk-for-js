// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureDataTransferClient } from "@azure/arm-datatransfer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the destination endpoint ports for the specified flow.
 *
 * @summary get the destination endpoint ports for the specified flow.
 * x-ms-original-file: 2026-02-06-preview/getFlowDestinationEndpointPorts.json
 */
async function getTheFlowStreamDestinationEndpointPorts(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureDataTransferClient(credential, subscriptionId);
  const result = await client.flows.getDestinationEndpointPorts(
    "testRG",
    "testConnection",
    "testFlow",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getTheFlowStreamDestinationEndpointPorts();
}

main().catch(console.error);
