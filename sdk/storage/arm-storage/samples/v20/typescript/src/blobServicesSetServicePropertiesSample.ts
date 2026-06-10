// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to sets the properties of a storage account’s Blob service, including properties for Storage Analytics and CORS (Cross-Origin Resource Sharing) rules.
 *
 * @summary sets the properties of a storage account’s Blob service, including properties for Storage Analytics and CORS (Cross-Origin Resource Sharing) rules.
 * x-ms-original-file: 2026-04-01/BlobServicesPut.json
 */
async function putBlobServices(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.blobServices.setServiceProperties("res4410", "sto8607", {
    changeFeed: { enabled: true, retentionInDays: 7 },
    cors: {
      corsRules: [
        {
          allowedHeaders: ["x-ms-meta-abc", "x-ms-meta-data*", "x-ms-meta-target*"],
          allowedMethods: ["GET", "HEAD", "POST", "OPTIONS", "MERGE", "PUT"],
          allowedOrigins: ["http://www.contoso.com", "http://www.fabrikam.com"],
          exposedHeaders: ["x-ms-meta-*"],
          maxAgeInSeconds: 100,
        },
        {
          allowedHeaders: ["*"],
          allowedMethods: ["GET"],
          allowedOrigins: ["*"],
          exposedHeaders: ["*"],
          maxAgeInSeconds: 2,
        },
        {
          allowedHeaders: ["x-ms-meta-12345675754564*"],
          allowedMethods: ["GET", "PUT"],
          allowedOrigins: ["http://www.abc23.com", "https://www.fabrikam.com/*"],
          exposedHeaders: ["x-ms-meta-abc", "x-ms-meta-data*", "x -ms-meta-target*"],
          maxAgeInSeconds: 2000,
        },
      ],
    },
    defaultServiceVersion: "2017-07-29",
    deleteRetentionPolicy: { days: 300, enabled: true },
    isVersioningEnabled: true,
    staticWebsite: {
      enabled: true,
      indexDocument: "home.html",
      errorDocument404Path: "site/errors/not-found.html",
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to sets the properties of a storage account’s Blob service, including properties for Storage Analytics and CORS (Cross-Origin Resource Sharing) rules.
 *
 * @summary sets the properties of a storage account’s Blob service, including properties for Storage Analytics and CORS (Cross-Origin Resource Sharing) rules.
 * x-ms-original-file: 2026-04-01/BlobServicesPutAllowPermanentDelete.json
 */
async function blobServicesPutAllowPermanentDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.blobServices.setServiceProperties("res4410", "sto8607", {
    deleteRetentionPolicy: { allowPermanentDelete: true, days: 300, enabled: true },
    isVersioningEnabled: true,
  });
  console.log(result);
}

/**
 * This sample demonstrates how to sets the properties of a storage account’s Blob service, including properties for Storage Analytics and CORS (Cross-Origin Resource Sharing) rules.
 *
 * @summary sets the properties of a storage account’s Blob service, including properties for Storage Analytics and CORS (Cross-Origin Resource Sharing) rules.
 * x-ms-original-file: 2026-04-01/BlobServicesPutLastAccessTimeBasedTracking.json
 */
async function blobServicesPutLastAccessTimeBasedTracking(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.blobServices.setServiceProperties("res4410", "sto8607", {
    lastAccessTimeTrackingPolicy: {
      name: "AccessTimeTracking",
      blobType: ["blockBlob"],
      enable: true,
      trackingGranularityInDays: 1,
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await putBlobServices();
  await blobServicesPutAllowPermanentDelete();
  await blobServicesPutLastAccessTimeBasedTracking();
}

main().catch(console.error);
