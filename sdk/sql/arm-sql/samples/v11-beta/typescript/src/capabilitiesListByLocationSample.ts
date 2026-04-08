// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the subscription capabilities available for the specified location.
 *
 * @summary gets the subscription capabilities available for the specified location.
 * x-ms-original-file: 2025-02-01-preview/LocationCapabilityListByLocation.json
 */
async function listSubscriptionCapabilitiesInTheGivenLocation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.capabilities.listByLocation("eastus");
  console.log(result);
}

async function main(): Promise<void> {
  await listSubscriptionCapabilitiesInTheGivenLocation();
}

main().catch(console.error);
