// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureVMwareSolutionAPI } = require("@azure/arm-avs");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a PureStoragePolicy
 *
 * @summary get a PureStoragePolicy
 * x-ms-original-file: 2024-09-01/PureStoragePolicies_Get.json
 */
async function pureStoragePoliciesGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureVMwareSolutionAPI(credential, subscriptionId);
  const result = await client.pureStoragePolicies.get("group1", "cloud1", "storagePolicy1");
  console.log(result);
}

async function main() {
  await pureStoragePoliciesGet();
}

main().catch(console.error);
