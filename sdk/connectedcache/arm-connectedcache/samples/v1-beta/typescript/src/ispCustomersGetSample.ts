// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConnectedCacheClient } from "@azure/arm-connectedcache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the ispCustomer resource information using this get call
 *
 * @summary gets the ispCustomer resource information using this get call
 * x-ms-original-file: 2023-05-01-preview/IspCustomers_Get_MaximumSet_Gen.json
 */
async function ispCustomersGetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new ConnectedCacheClient(credential, subscriptionId);
  const result = await client.ispCustomers.get(
    "rgConnectedCache",
    "cmcjfueweicolcjkwmsuvcj",
  );
  console.log(result);
}

async function main() {
  ispCustomersGetGeneratedByMaximumSetRule();
}

main().catch(console.error);
