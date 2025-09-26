// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataProtectionClient } from "@azure/arm-dataprotection";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the operation result of operation triggered by Export Jobs API. If the operation is successful, then it also contains URL of a Blob and a SAS key to access the same. The blob contains exported jobs in JSON serialized format.
 *
 * @summary gets the operation result of operation triggered by Export Jobs API. If the operation is successful, then it also contains URL of a Blob and a SAS key to access the same. The blob contains exported jobs in JSON serialized format.
 * x-ms-original-file: 2025-07-01/JobCRUD/GetExportJobsOperationResult.json
 */
async function getExportJobsOperationResult(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DataProtectionClient(credential, subscriptionId);
  const result = await client.exportJobsOperationResult.get(
    "SwaggerTestRg",
    "NetSDKTestRsVault",
    "00000000-0000-0000-0000-000000000000",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getExportJobsOperationResult();
}

main().catch(console.error);
