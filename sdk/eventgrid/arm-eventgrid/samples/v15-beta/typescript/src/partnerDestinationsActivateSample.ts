// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventGridManagementClient } from "@azure/arm-eventgrid";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to activate a newly created partner destination.
 *
 * @summary activate a newly created partner destination.
 * x-ms-original-file: 2025-07-15-preview/PartnerDestinations_Activate.json
 */
async function partnerDestinationsActivate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8f6b6269-84f2-4d09-9e31-1127efcd1e40";
  const client = new EventGridManagementClient(credential, subscriptionId);
  const result = await client.partnerDestinations.activate(
    "examplerg",
    "examplePartnerDestination1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await partnerDestinationsActivate();
}

main().catch(console.error);
