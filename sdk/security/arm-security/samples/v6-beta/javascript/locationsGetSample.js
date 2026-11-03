// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SecurityCenter } = require("@azure/arm-security");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to details of a specific location
 *
 * @summary details of a specific location
 * x-ms-original-file: 2015-06-01-preview/Locations/GetLocation_example.json
 */
async function getSecurityDataLocation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "20ff7fc3-e762-44dd-bd96-b71116dcdc23";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.locations.get("centralus");
  console.log(result);
}

async function main() {
  await getSecurityDataLocation();
}

main().catch(console.error);
