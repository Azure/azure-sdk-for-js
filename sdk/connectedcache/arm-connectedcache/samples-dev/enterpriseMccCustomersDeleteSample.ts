// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to this api deletes an existing enterprise mcc customer resource
 *
 * @summary this api deletes an existing enterprise mcc customer resource
 * x-ms-original-file: 2023-05-01-preview/EnterpriseMccCustomers_Delete_MaximumSet_Gen.json
 */

import { ConnectedCacheClient } from "@azure/arm-connectedcache";
import { DefaultAzureCredential } from "@azure/identity";

async function enterpriseMccCustomersDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new ConnectedCacheClient(credential, subscriptionId);
  await client.enterpriseMccCustomers.delete("rgConnectedCache", "zktb");
}

async function main(): Promise<void> {
  await enterpriseMccCustomersDelete();
}

main().catch(console.error);
