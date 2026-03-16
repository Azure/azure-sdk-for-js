// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgreSQLManagementFlexibleServerClient } = require("@azure/arm-postgresql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the capabilities available in a given location for a specific subscription.
 *
 * @summary lists the capabilities available in a given location for a specific subscription.
 * x-ms-original-file: 2026-01-01-preview/CapabilitiesByLocationList.json
 */
async function listTheCapabilitiesAvailableInAGivenLocationForASpecificSubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new PostgreSQLManagementFlexibleServerClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.capabilitiesByLocation.list("eastus")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listTheCapabilitiesAvailableInAGivenLocationForASpecificSubscription();
}

main().catch(console.error);
