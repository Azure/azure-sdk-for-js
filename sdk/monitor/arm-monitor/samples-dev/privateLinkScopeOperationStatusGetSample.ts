// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorClient } from "@azure/arm-monitor";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the status of an azure asynchronous operation associated with a private link scope operation.
 *
 * @summary get the status of an azure asynchronous operation associated with a private link scope operation.
 * x-ms-original-file: 2023-06-01-preview/privateLinkScopeOperationStatuses.json
 */
async function getSpecificOperationStatus(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "613192d7-503f-477a-9cfe-4efc3ee2bd60";
  const client = new MonitorClient(credential, subscriptionId);
  const result = await client.privateLinkScopeOperationStatus.get(
    "MyResourceGroup",
    "713192d7-503f-477a-9cfe-4efc3ee2bd11",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getSpecificOperationStatus();
}

main().catch(console.error);
