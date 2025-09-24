// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to delete a PureStoragePolicy
 *
 * @summary delete a PureStoragePolicy
 * x-ms-original-file: 2024-09-01/PureStoragePolicies_Delete.json
 */

import { AzureVMwareSolutionAPI } from "@azure/arm-avs";
import { DefaultAzureCredential } from "@azure/identity";

async function pureStoragePoliciesDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  await client.pureStoragePolicies.delete("group1", "cloud1", "storagePolicy1");
}

async function main(): Promise<void> {
  await pureStoragePoliciesDelete();
}

main().catch(console.error);
