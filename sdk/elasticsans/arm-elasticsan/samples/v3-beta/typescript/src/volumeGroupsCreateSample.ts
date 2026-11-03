// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ElasticSanManagement } from "@azure/arm-elasticsan";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a Volume Group.
 *
 * @summary create a Volume Group.
 * x-ms-original-file: 2026-05-01-preview/VolumeGroups_Create_MaximumSet_Gen.json
 */
async function volumeGroupsCreateMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanManagement(credential, subscriptionId);
  const result = await client.volumeGroups.create(
    "resourcegroupname",
    "elasticsanname",
    "volumegroupname",
    {
      identity: { type: "None", userAssignedIdentities: { key2350: {} } },
      properties: {
        deleteRetentionPolicy: { policyState: "Enabled", retentionPeriodDays: 14 },
        encryption: "EncryptionAtRestWithPlatformKey",
        encryptionProperties: {
          encryptionIdentity: { encryptionUserAssignedIdentity: "vgbeephfgecgg" },
          keyVaultProperties: {
            keyName: "rommjwp",
            keyVaultUri: "https://microsoft.com/at",
            keyVersion: "ulmxxgzgsuhalwesmhfslq",
          },
        },
        enforceDataIntegrityCheckForIscsi: true,
        encryptionInTransit: true,
        networkAcls: {
          virtualNetworkRules: [{ action: "Allow", virtualNetworkResourceId: "fhhawhc" }],
        },
        protocolType: "Iscsi",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create a Volume Group.
 *
 * @summary create a Volume Group.
 * x-ms-original-file: 2026-05-01-preview/VolumeGroups_Create_MinimumSet_Gen.json
 */
async function volumeGroupsCreateMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanManagement(credential, subscriptionId);
  const result = await client.volumeGroups.create(
    "resourcegroupname",
    "elasticsanname",
    "volumegroupname",
    {},
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create a Volume Group.
 *
 * @summary create a Volume Group.
 * x-ms-original-file: 2026-05-01-preview/VolumeGroups_GeneralPurpose_Create_MaximumSet_Gen.json
 */
async function volumeGroupsGeneralPurposeCreateMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanManagement(credential, subscriptionId);
  const result = await client.volumeGroups.create(
    "resourcegroupname",
    "elasticsanname",
    "volumegroupname",
    {
      identity: { type: "None", userAssignedIdentities: { key2350: {} } },
      properties: {
        deleteRetentionPolicy: { policyState: "Enabled", retentionPeriodDays: 14 },
        encryption: "EncryptionAtRestWithPlatformKey",
        encryptionProperties: {
          encryptionIdentity: { encryptionUserAssignedIdentity: "vgbeephfgecgg" },
          keyVaultProperties: {
            keyName: "rommjwp",
            keyVaultUri: "https://microsoft.com/at",
            keyVersion: "ulmxxgzgsuhalwesmhfslq",
          },
        },
        enforceDataIntegrityCheckForIscsi: true,
        encryptionInTransit: true,
        networkAcls: {
          virtualNetworkRules: [{ action: "Allow", virtualNetworkResourceId: "fhhawhc" }],
        },
        protocolType: "Iscsi",
        qualityOfService: "GeneralPurpose",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create a Volume Group.
 *
 * @summary create a Volume Group.
 * x-ms-original-file: 2026-05-01-preview/VolumeGroups_GeneralPurpose_Create_MinimumSet_Gen.json
 */
async function volumeGroupsGeneralPurposeCreateMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanManagement(credential, subscriptionId);
  const result = await client.volumeGroups.create(
    "resourcegroupname",
    "elasticsanname",
    "volumegroupname",
    { properties: { protocolType: "Iscsi", qualityOfService: "GeneralPurpose" } },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create a Volume Group.
 *
 * @summary create a Volume Group.
 * x-ms-original-file: 2026-05-01-preview/VolumeGroups_PerformanceCritical_Create_MaximumSet_Gen.json
 */
async function volumeGroupsPerformanceCriticalCreateMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanManagement(credential, subscriptionId);
  const result = await client.volumeGroups.create(
    "resourcegroupname",
    "elasticsanname",
    "volumegroupname",
    {
      identity: { type: "None", userAssignedIdentities: { key2350: {} } },
      properties: {
        encryption: "EncryptionAtRestWithPlatformKey",
        encryptionProperties: {
          encryptionIdentity: { encryptionUserAssignedIdentity: "vgbeephfgecgg" },
          keyVaultProperties: {
            keyName: "rommjwp",
            keyVaultUri: "https://microsoft.com/at",
            keyVersion: "ulmxxgzgsuhalwesmhfslq",
          },
        },
        protocolType: "DirectAttach",
        qualityOfService: "PerformanceCritical",
        reservedIops: 10000,
        reservedMBps: 800,
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create a Volume Group.
 *
 * @summary create a Volume Group.
 * x-ms-original-file: 2026-05-01-preview/VolumeGroups_PerformanceCritical_Create_MinimumSet_Gen.json
 */
async function volumeGroupsPerformanceCriticalCreateMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subscriptionid";
  const client = new ElasticSanManagement(credential, subscriptionId);
  const result = await client.volumeGroups.create(
    "resourcegroupname",
    "elasticsanname",
    "volumegroupname",
    {
      properties: {
        protocolType: "DirectAttach",
        qualityOfService: "PerformanceCritical",
        reservedIops: 10000,
        reservedMBps: 800,
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await volumeGroupsCreateMaximumSetGen();
  await volumeGroupsCreateMinimumSetGen();
  await volumeGroupsGeneralPurposeCreateMaximumSetGen();
  await volumeGroupsGeneralPurposeCreateMinimumSetGen();
  await volumeGroupsPerformanceCriticalCreateMaximumSetGen();
  await volumeGroupsPerformanceCriticalCreateMinimumSetGen();
}

main().catch(console.error);
