// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to fetch the report summary of a single storage task assignment's instances
 *
 * @summary fetch the report summary of a single storage task assignment's instances
 * x-ms-original-file: 2025-08-01/storageTaskAssignmentsList/ListStorageTaskAssignmentInstancesReportSummary.json
 */
async function listStorageTaskAssignmentInstancesReportSummary(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1f31ba14-ce16-4281-b9b4-3e78da6e1616";
  const client = new StorageManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.storageTaskAssignmentInstancesReport.list(
    "res4228",
    "sto4445",
    "myassignment1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listStorageTaskAssignmentInstancesReportSummary();
}

main().catch(console.error);
