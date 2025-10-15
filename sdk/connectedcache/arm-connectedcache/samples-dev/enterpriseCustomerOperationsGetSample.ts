// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to retrieves the properties of a Enterprise customer
 *
 * @summary retrieves the properties of a Enterprise customer
 * x-ms-original-file: 2023-05-01-preview/EnterpriseCustomerOperations_Get_MaximumSet_Gen.json
 */

import { ConnectedCacheClient } from "@azure/arm-connectedcache";
import { DefaultAzureCredential } from "@azure/identity";

async function enterpriseCustomerOperationsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new ConnectedCacheClient(credential, subscriptionId);
  const result = await client.enterpriseCustomerOperations.get("rgConnectedCache", "MCCTPTest2");
  console.log(result);
}

async function main(): Promise<void> {
  await enterpriseCustomerOperationsGet();
}

main().catch(console.error);
