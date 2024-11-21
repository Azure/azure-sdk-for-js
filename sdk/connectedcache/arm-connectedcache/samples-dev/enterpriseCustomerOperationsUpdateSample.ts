// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConnectedCacheClient } from "@azure/arm-connectedcache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates an existing enterpriseCustomers
 *
 * @summary updates an existing enterpriseCustomers
 * x-ms-original-file: 2023-05-01-preview/EnterpriseCustomerOperations_Update_MaximumSet_Gen.json
 */
async function enterpriseCustomerOperationsUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new ConnectedCacheClient(credential, subscriptionId);
  const result = await client.enterpriseCustomerOperations.update(
    "rgConnectedCache",
    "MCCTPTest2",
    { tags: { key1653: "nzjczrhclhkndesgy" } },
  );
  console.log(result);
}

async function main() {
  enterpriseCustomerOperationsUpdate();
}

main().catch(console.error);
