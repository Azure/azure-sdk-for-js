// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConnectedCacheClient } from "@azure/arm-connectedcache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this api updates an existing enterprise mcc customer resource
 *
 * @summary this api updates an existing enterprise mcc customer resource
 * x-ms-original-file: 2024-11-30-preview/EnterpriseMccCustomers_Update_MaximumSet_Gen.json
 */
async function enterpriseMccCustomersUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new ConnectedCacheClient(credential, subscriptionId);
  const result = await client.enterpriseMccCustomers.update("rgConnectedCache", "MccRPTest1", {
    tags: { key1878: "warz" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await enterpriseMccCustomersUpdate();
}

main().catch(console.error);
