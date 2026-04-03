// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "@azure/arm-eventgrid";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete existing partner destination.
 *
 * @summary delete existing partner destination.
 * x-ms-original-file: 2025-07-15-preview/PartnerDestinations_Delete.json
 */
async function partnerDestinationsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  await client.partnerDestinations.delete("examplerg", "examplePartnerDestinationName1");
}

async function main(): Promise<void> {
  await partnerDestinationsDelete();
}

main().catch(console.error);
