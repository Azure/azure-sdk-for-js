// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets the subscription capabilities available for the specified location.
 *
 * @summary Gets the subscription capabilities available for the specified location.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2020-11-01-preview/examples/LocationCapabilityListByLocation.json
 */
async function listSubscriptionCapabilitiesInTheGivenLocation() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const locationName = "eastus";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.capabilities.listByLocation(locationName);
  console.log(result);
}

async function main() {
  await listSubscriptionCapabilitiesInTheGivenLocation();
}

main().catch(console.error);
