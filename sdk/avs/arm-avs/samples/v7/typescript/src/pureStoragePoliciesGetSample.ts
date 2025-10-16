// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureVMwareSolutionAPI } from "@azure/arm-avs";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a PureStoragePolicy
 *
 * @summary get a PureStoragePolicy
 * x-ms-original-file: 2025-09-01/PureStoragePolicies_Get.json
 */
async function pureStoragePoliciesGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.pureStoragePolicies.get("group1", "cloud1", "storagePolicy1");
  console.log(result);
}

async function main(): Promise<void> {
  await pureStoragePoliciesGet();
}

main().catch(console.error);
