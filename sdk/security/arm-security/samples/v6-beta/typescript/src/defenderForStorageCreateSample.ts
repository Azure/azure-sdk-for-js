// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates the Defender for Storage settings on a specified storage account.
 *
 * @summary creates or updates the Defender for Storage settings on a specified storage account.
 * x-ms-original-file: 2025-09-01-preview/DefenderForStorage/PutDefenderForStorageSettings_example.json
 */
async function createsOrUpdatesTheDefenderForStorageSettingsOnASpecifiedResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new SecurityCenter(credential);
  const result = await client.defenderForStorage.create(
    "subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23/resourceGroups/SampleRG/providers/Microsoft.Storage/storageAccounts/samplestorageaccount",
    "current",
    {
      properties: {
        isEnabled: true,
        malwareScanning: {
          automatedResponse: "BlobSoftDelete",
          blobScanResultsOptions: "BlobIndexTags",
          onUpload: {
            capGBPerMonth: 10000,
            filters: {
              excludeBlobsLargerThan: 1024,
              excludeBlobsWithPrefix: ["unscanned-container", "sample-container/logs"],
              excludeBlobsWithSuffix: [".log", ".jpg"],
            },
            isEnabled: true,
          },
          scanResultsEventGridTopicResourceId:
            "/subscriptions/20ff7fc3-e762-44dd-bd96-b71116dcdc23/resourceGroups/SampleRG/providers/Microsoft.EventGrid/topics/sampletopic",
        },
        overrideSubscriptionLevelSettings: true,
        sensitiveDataDiscovery: { isEnabled: true },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createsOrUpdatesTheDefenderForStorageSettingsOnASpecifiedResource();
}

main().catch(console.error);
