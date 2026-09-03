// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { BatchManagementClient } = require("@azure/arm-batch");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all of the application packages in the specified application.
 *
 * @summary lists all of the application packages in the specified application.
 * x-ms-original-file: 2025-06-01/ApplicationPackageList.json
 */
async function applicationPackageList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789012";
  const client = new BatchManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.applicationPackage.list(
    "default-azurebatch-japaneast",
    "sampleacct",
    "app1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await applicationPackageList();
}

main().catch(console.error);
