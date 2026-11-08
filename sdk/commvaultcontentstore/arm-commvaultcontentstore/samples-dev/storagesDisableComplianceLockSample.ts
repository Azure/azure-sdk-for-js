// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContentStoreClient } from "@azure/arm-commvaultcontentstore";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to disable compliance lock on the storage. Initiates an out-of-band multi-person authorization (MPA) email approval workflow on the partner side. The storage compliance lock status transitions to 'DisablementPending' immediately; once the MPA approval completes, the status becomes 'Disabled' (observable via the refresh action).
 *
 * @summary disable compliance lock on the storage. Initiates an out-of-band multi-person authorization (MPA) email approval workflow on the partner side. The storage compliance lock status transitions to 'DisablementPending' immediately; once the MPA approval completes, the status becomes 'Disabled' (observable via the refresh action).
 * x-ms-original-file: 2026-09-30/Storages_DisableComplianceLock_MaximumSet_Gen.json
 */
async function storagesDisableComplianceLockMaximumSetDisableComplianceLockOnStorageInitiatesMPAApprovalStatusBecomesDisablementPending(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "65D4E6D7-7063-4C4B-BAC5-13C45474009E";
  const client = new ContentStoreClient(credential, subscriptionId);
  const result = await client.storages.disableComplianceLock(
    "rgcommvault",
    "myCloudAccount",
    "myStorage",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await storagesDisableComplianceLockMaximumSetDisableComplianceLockOnStorageInitiatesMPAApprovalStatusBecomesDisablementPending();
}

main().catch(console.error);
