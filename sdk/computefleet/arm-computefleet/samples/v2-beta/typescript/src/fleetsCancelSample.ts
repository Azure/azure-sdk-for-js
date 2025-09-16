// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureFleetClient } from "@azure/arm-computefleet";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to cancels an instance Fleet creation that is in progress.
 *
 * @summary cancels an instance Fleet creation that is in progress.
 * x-ms-original-file: 2025-07-01-preview/Fleets_Cancel.json
 */
async function fleetsCancel(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "3453D930-6DDF-4466-B3B3-E1AEE9BD448C";
  const client = new AzureFleetClient(credential, subscriptionId);
  await client.fleets.cancel("rgazurefleet", "myFleet");
}

async function main(): Promise<void> {
  await fleetsCancel();
}

main().catch(console.error);
