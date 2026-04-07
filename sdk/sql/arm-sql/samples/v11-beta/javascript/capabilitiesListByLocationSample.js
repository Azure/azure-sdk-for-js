// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the subscription capabilities available for the specified location.
 *
 * @summary gets the subscription capabilities available for the specified location.
 * x-ms-original-file: 2025-02-01-preview/LocationCapabilityListByLocation.json
 */
async function listSubscriptionCapabilitiesInTheGivenLocation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.capabilities.listByLocation("eastus");
  console.log(result);
}

async function main() {
  await listSubscriptionCapabilitiesInTheGivenLocation();
}

main().catch(console.error);
