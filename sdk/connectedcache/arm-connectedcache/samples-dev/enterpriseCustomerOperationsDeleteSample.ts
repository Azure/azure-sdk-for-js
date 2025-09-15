// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to deletes an existing customer Enterprise resource
 *
 * @summary deletes an existing customer Enterprise resource
 * x-ms-original-file: 2023-05-01-preview/EnterpriseCustomerOperations_Delete_MaximumSet_Gen.json
 */

import { ConnectedCacheClient } from "@azure/arm-connectedcache";
import { DefaultAzureCredential } from "@azure/identity";

async function enterpriseCustomerOperationsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new ConnectedCacheClient(credential, subscriptionId);
  await client.enterpriseCustomerOperations.delete(
    "rgConnectedCache",
    "jeubxmhiaihcusgnahblvvckbdcetacvqgwbohlrqucodtlwuyefpejskvamgrdnwgucziodcfpjhqy",
  );
}

async function main(): Promise<void> {
  await enterpriseCustomerOperationsDelete();
}

main().catch(console.error);
