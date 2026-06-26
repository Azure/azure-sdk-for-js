// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ImpactClient } from "@azure/arm-impactreporting";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to only for select HPC customers at this time, who can use this POST endpoint to trigger an action, where the UserRP/AzImpactRP service creates and returns a user-delegate SAS token for the storage account/container unique to the customer (identified by subscription ID).
 *
 * @summary only for select HPC customers at this time, who can use this POST endpoint to trigger an action, where the UserRP/AzImpactRP service creates and returns a user-delegate SAS token for the storage account/container unique to the customer (identified by subscription ID).
 * x-ms-original-file: 2026-01-01-preview/UploadService_GetUploadToken.json
 */
async function getUploadTokenToUseForLogUpload(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ImpactClient(credential, subscriptionId);
  const result = await client.uploadService.getUploadToken();
  console.log(result);
}

async function main(): Promise<void> {
  await getUploadTokenToUseForLogUpload();
}

main().catch(console.error);
