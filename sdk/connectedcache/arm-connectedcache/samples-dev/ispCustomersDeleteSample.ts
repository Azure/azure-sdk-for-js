// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to this api deletes an existing ispCustomer resource
 *
 * @summary this api deletes an existing ispCustomer resource
 * x-ms-original-file: 2023-05-01-preview/IspCustomers_Delete_MaximumSet_Gen.json
 */

import { ConnectedCacheClient } from "@azure/arm-connectedcache";
import { DefaultAzureCredential } from "@azure/identity";

async function ispCustomersDeleteGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new ConnectedCacheClient(credential, subscriptionId);
  await client.ispCustomers.delete(
    "rgConnectedCache",
    "hdontfoythjsaeyjhrakckgimgchxwzttbcnvntpvdsgeumxpgnjurptd",
  );
}

async function main(): Promise<void> {
  await ispCustomersDeleteGeneratedByMaximumSetRule();
}

main().catch(console.error);
