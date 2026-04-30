// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConnectedCacheClient } = require("@azure/arm-connectedcache");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this api deletes an existing ispCustomer resource
 *
 * @summary this api deletes an existing ispCustomer resource
 * x-ms-original-file: 2024-11-30-preview/IspCustomers_Delete_MaximumSet_Gen.json
 */
async function ispCustomersDeleteGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new ConnectedCacheClient(credential, subscriptionId);
  await client.ispCustomers.delete(
    "rgConnectedCache",
    "hdontfoythjsaeyjhrakckgimgchxwzttbcnvntpvdsgeumxpgnjurptd",
  );
}

async function main() {
  await ispCustomersDeleteGeneratedByMaximumSetRule();
}

main().catch(console.error);
