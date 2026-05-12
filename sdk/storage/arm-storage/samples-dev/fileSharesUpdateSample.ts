// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates share properties as specified in request body. Properties not mentioned in the request will not be changed. Update fails if the specified share does not already exist.
 *
 * @summary updates share properties as specified in request body. Properties not mentioned in the request will not be changed. Update fails if the specified share does not already exist.
 * x-ms-original-file: 2025-08-01/FileShareAclsPatch.json
 */
async function updateShareAcls(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.fileShares.update("res3376", "sto328", "share6185", {
    fileShareProperties: {
      signedIdentifiers: [
        {
          accessPolicy: {
            expiryTime: new Date("2021-05-01T08:49:37.0000000Z"),
            permission: "rwd",
            startTime: new Date("2021-04-01T08:49:37.0000000Z"),
          },
          id: "MTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0NTY3ODkwMTI",
        },
      ],
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates share properties as specified in request body. Properties not mentioned in the request will not be changed. Update fails if the specified share does not already exist.
 *
 * @summary updates share properties as specified in request body. Properties not mentioned in the request will not be changed. Update fails if the specified share does not already exist.
 * x-ms-original-file: 2025-08-01/FileSharesPatch.json
 */
async function updateShares(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.fileShares.update("res3376", "sto328", "share6185", {
    fileShareProperties: { metadata: { type: "image" } },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates share properties as specified in request body. Properties not mentioned in the request will not be changed. Update fails if the specified share does not already exist.
 *
 * @summary updates share properties as specified in request body. Properties not mentioned in the request will not be changed. Update fails if the specified share does not already exist.
 * x-ms-original-file: 2025-08-01/FileSharesPatch_PaidBursting.json
 */
async function updateSharePaidBursting(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.fileShares.update("res3376", "sto328", "share6185", {
    fileShareProperties: {
      fileSharePaidBursting: {
        paidBurstingEnabled: true,
        paidBurstingMaxBandwidthMibps: 10340,
        paidBurstingMaxIops: 102400,
      },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates share properties as specified in request body. Properties not mentioned in the request will not be changed. Update fails if the specified share does not already exist.
 *
 * @summary updates share properties as specified in request body. Properties not mentioned in the request will not be changed. Update fails if the specified share does not already exist.
 * x-ms-original-file: 2025-08-01/FileSharesPatch_ProvisionedV2.json
 */
async function updateShareProvisionedV2(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.fileShares.update("res3376", "sto328", "share6185", {
    fileShareProperties: { provisionedBandwidthMibps: 200, provisionedIops: 5000, shareQuota: 100 },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateShareAcls();
  await updateShares();
  await updateSharePaidBursting();
  await updateShareProvisionedV2();
}

main().catch(console.error);
