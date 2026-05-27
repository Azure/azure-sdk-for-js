// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the specified Storage DataShare.
 *
 * @summary get the specified Storage DataShare.
 * x-ms-original-file: 2025-08-01/StorageDataShareCRUD/StorageDataShares_Get.json
 */
async function getDataShare() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.dataShares.get("testrg", "teststorageaccount", "testdatashare");
  console.log(result);
}

async function main() {
  await getDataShare();
}

main().catch(console.error);
