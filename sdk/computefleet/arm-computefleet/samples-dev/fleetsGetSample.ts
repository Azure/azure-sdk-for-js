// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AzureFleetClient } from "@azure/arm-computefleet";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a Fleet
 *
 * @summary get a Fleet
 * x-ms-original-file: 2024-05-01-preview/Fleets_Get.json
 */
async function fleetsGet(): void {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1DC2F28C-A625-4B0E-9748-9885A3C9E9EB";
  const client = new AzureFleetClient(credential, subscriptionId);
  const result = await client.fleets.get("rgazurefleet", "testFleet");
  console.log(result);
}

async function main() {
  fleetsGet();
}

main().catch(console.error);
