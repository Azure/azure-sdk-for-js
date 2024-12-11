// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConnectedCacheClient } from "@azure/arm-connectedcache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this api updates an existing ispCustomer resource
 *
 * @summary this api updates an existing ispCustomer resource
 * x-ms-original-file: 2023-05-01-preview/IspCustomers_Update_MaximumSet_Gen.json
 */
async function ispCustomerUpdateDetailsGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new ConnectedCacheClient(credential, subscriptionId);
  const result = await client.ispCustomers.update(
    "rgConnectedCache",
    "MccRPTest2",
    { tags: { key1653: "nzjczrhclhkndesgy" } },
  );
  console.log(result);
}

async function main() {
  ispCustomerUpdateDetailsGeneratedByMaximumSetRule();
}

main().catch(console.error);
