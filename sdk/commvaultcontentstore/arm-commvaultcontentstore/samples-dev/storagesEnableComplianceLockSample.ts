// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContentStoreClient } from "@azure/arm-commvaultcontentstore";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to enable compliance lock on the storage. Synchronous operation.
 *
 * @summary enable compliance lock on the storage. Synchronous operation.
 * x-ms-original-file: 2026-08-01-preview/Storages_EnableComplianceLock_MaximumSet_Gen.json
 */
async function storagesEnableComplianceLockMaximumSetEnableComplianceLockOnStorage(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "65D4E6D7-7063-4C4B-BAC5-13C45474009E";
  const client = new ContentStoreClient(credential, subscriptionId);
  const result = await client.storages.enableComplianceLock(
    "rgcommvault",
    "myCloudAccount",
    "myStorage",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await storagesEnableComplianceLockMaximumSetEnableComplianceLockOnStorage();
}

main().catch(console.error);
