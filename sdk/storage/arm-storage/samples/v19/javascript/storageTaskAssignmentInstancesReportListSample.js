// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Fetch the report summary of a single storage task assignment's instances
 *
 * @summary Fetch the report summary of a single storage task assignment's instances
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/storageTaskAssignmentsList/ListStorageTaskAssignmentInstancesReportSummary.json
 */
async function listStorageTaskAssignmentInstancesReportSummary() {
  const subscriptionId =
    process.env["STORAGE_SUBSCRIPTION_ID"] || "1f31ba14-ce16-4281-b9b4-3e78da6e1616";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "res4228";
  const accountName = "sto4445";
  const storageTaskAssignmentName = "myassignment1";
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.storageTaskAssignmentInstancesReport.list(
    resourceGroupName,
    accountName,
    storageTaskAssignmentName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listStorageTaskAssignmentInstancesReportSummary();
}

main().catch(console.error);
