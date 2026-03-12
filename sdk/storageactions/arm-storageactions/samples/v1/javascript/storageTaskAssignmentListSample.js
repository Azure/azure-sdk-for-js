// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageActionsManagementClient } = require("@azure/arm-storageactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists Resource IDs of the Storage Task Assignments associated with this Storage Task.
 *
 * @summary lists Resource IDs of the Storage Task Assignments associated with this Storage Task.
 * x-ms-original-file: 2023-01-01/storageTasksList/ListStorageTaskAssignmentIds.json
 */
async function listStorageTaskAssignmentsByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1f31ba14-ce16-4281-b9b4-3e78da6e1616";
  const client = new StorageActionsManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.storageTaskAssignment.list("rgroup1", "mytask1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listStorageTaskAssignmentsByResourceGroup();
}

main().catch(console.error);
