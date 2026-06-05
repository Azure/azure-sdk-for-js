// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PostgreSQLManagementFlexibleServerClient } from "@azure/arm-postgresql-flexible";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the capabilities available in a given location for a specific subscription.
 *
 * @summary lists the capabilities available in a given location for a specific subscription.
 * x-ms-original-file: 2026-01-01-preview/CapabilitiesByLocationList.json
 */
async function listTheCapabilitiesAvailableInAGivenLocationForASpecificSubscription(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.capabilitiesByLocation.list("eastus")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listTheCapabilitiesAvailableInAGivenLocationForASpecificSubscription();
}

main().catch(console.error);
