// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { GuestConfigurationClient } from "@azure/arm-guestconfiguration";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list the operations for the provider
 *
 * @summary list the operations for the provider
 * x-ms-original-file: 2024-04-05/listOperations.json
 */
async function listsAllOfTheAvailableGuestConfigurationRestAPIOperations(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new GuestConfigurationClient(credential);
  const resArray = new Array();
  for await (const item of client.operations.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listsAllOfTheAvailableGuestConfigurationRestAPIOperations();
}

main().catch(console.error);
