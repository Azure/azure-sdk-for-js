// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureVMwareSolutionAPI } = require("@azure/arm-avs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a PureStoragePolicy
 *
 * @summary delete a PureStoragePolicy
 * x-ms-original-file: 2025-09-01/PureStoragePolicies_Delete.json
 */
async function pureStoragePoliciesDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  await client.pureStoragePolicies.delete("group1", "cloud1", "storagePolicy1");
}

async function main() {
  await pureStoragePoliciesDelete();
}

main().catch(console.error);
